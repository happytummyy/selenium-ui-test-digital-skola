const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const DashboardPage = require('../WebComponent/DashboardPage');
const CartPage = require('../WebComponent/CartPage');
const CheckOutPage = require('../WebComponent/CheckOutPage');
const CheckOutOverviewPage = require('../WebComponent/CheckOutOverviewPage');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD; 

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase 4 [login] #Regression', function () {
    this.timeout(40000);
    let driver;

    switch(browser.toLowerCase()){
        case 'firefox':
            const firefox = require('selenium-webdriver/firefox');
            options = new firefox.Options();
            options.addArguments('--headless');
            break;
        /*case 'edge':
            const edge = require('selenium-webdriver/edge');
            options = new edge.Options();
            options.addArguments('--headless');*/
        case 'chrome':
        default:
            const chrome = require('selenium-webdriver/chrome');
            options = new chrome.Options();
            options.addArguments('--headless');
            break;
    }

    //Run setiap mulai test, satu kali saja paling awal
    before(async function (){
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
    });

    //Test Suite dimulai dengan apa, setiap melakukan tes
    beforeEach(async function (){
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login(username,password);

        const cartPage = new CartPage(driver);
        await cartPage.addToCart();

        const cartScreen = new DashboardPage(driver);
        const spantitle = await cartScreen.isOnDashboard();
        assert.strictEqual(spantitle, 'Your Cart', 'Expected title screen to be Your Cart')

        await cartPage.checkOut();

        const checkOutInformation = new DashboardPage(driver);
        const spantitle2 = await checkOutInformation.isOnDashboard();
        assert.strictEqual(spantitle2, 'Checkout: Your Information', 'Expected title screen to be Checkout: Your Information')

        const checkoutPage = new CheckOutPage(driver);
        await checkoutPage.checkout('Digital', 'Skola', '123456');

        const checkOutOverview = new DashboardPage(driver);
        const spantitle3 = await checkOutOverview.isOnDashboard();
        assert.strictEqual(spantitle3, 'Checkout: Overview', 'Expected title screen to be Checkout: Overview')

        const checkoutoverviewPage = new CheckOutOverviewPage(driver);
        await checkoutoverviewPage.checkoutFinish();
    });

    //Assertion atau validasi
    it('Checkout', async function (){
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.isOnDashboard();
        const title2 = await dashboardPage.isOnBody();
        
        assert.strictEqual(title, 'Checkout: Complete!', 'Expected title screen to be Checkout: Complete!')
        assert.strictEqual(title2, 'Thank you for your order!', 'Expected screen to be Thank you for your order!')
    });

    afterEach(async function (){
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
    });

    after(async function (){
        await driver.quit();
    });

});