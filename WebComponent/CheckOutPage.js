const { By } = require('selenium-webdriver');

class CheckOutPage {
    constructor(driver){
        this.driver = driver;
        this.firstnameInput = By.id('first-name');
        this.lastnameInput = By.id('last-name');
        this.postcodeInput = By.id('postal-code');
        this.continueButton = By.xpath("//input[@id='continue']");
        this.errorMessage = By.css('.error-message-container');
    }

    async navigate(browser){
        await this.driver.get(browser);
    }

    async checkout(firstname, lastname, postalcode){
        await this.driver.findElement(this.firstnameInput).sendKeys(firstname);
        await this.driver.findElement(this.lastnameInput).sendKeys(lastname);
        await this.driver.findElement(this.postcodeInput).sendKeys(postalcode);
        await this.driver.findElement(this.continueButton).click();
    }

    async getErrorMessage() {
        try {
            const errorElement = await this.driver.findElement(this.errorMessage);
            return await errorElement.getText();
        } catch (err) {
            return null; //tidak ada message
        }
    }
}

module.exports = CheckOutPage;