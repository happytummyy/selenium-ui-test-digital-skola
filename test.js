const { Builder, By, Key, until } = require('selenium-webdriver');

async function exampleTest() {
    //membuat koneksi dengan browser driver
    let driver = await new Builder().forBrowser('chrome').build();

    //exception handling
    try {
        //buka URL di browser
        await driver.get("http://www.google.com"); 

        //Mencari di search box
        let searchBox = await driver.findElement(By.name('q'));

        //Simulate user behaviour typing "Hello Workd"
        await searchBox.sendKeys('Hello World!', Key.RETURN);
        await driver.wait(until.elementLocated(By.id('result-stats')), 10000); 

        let title = await driver.getTitle();
        console.log(`Page Title is: ${title}`);

    } finally {
        //Tutup browser
        await driver.quit();

    }

}

exampleTest();