const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function sauceDemoLoginTest(){
    //Membuat koneksi dengan Browser Driver
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get("https://www.saucedemo.com");

        //Memasukkan Username dan Password
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.xpath("//input[@id='password']")).sendKeys('secret_sauce');

        //Click Button Login
        await driver.findElement(By.xpath("//input[@id='login-button']")).click();

        //Memastikan kita di dashboard dengan mencari judul "Swag Labs"
        let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
        assert.strictEqual(titleText.includes('Swag Labs'), true, "Title does not include 'Swag Labs'");

        //Memastikan kita di dashboard dengan mencari "Burger Button"
        //let menuButton = await driver.findElement(By.xpath("//button[@id='react-burger-menu-btn']"));
        //assert.strictEqual(await menuButton.isDisplayed(),true,"Menu Button is not visible"); 

        //Add items to cart
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']")).click();
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-bike-light']")).click();
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-bolt-t-shirt']")).click();
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-fleece-jacket']")).click();
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-onesie']")).click();
        await driver.findElement(By.xpath("//button[@id='add-to-cart-test.allthethings()-t-shirt-(red)']")).click();

        //CLick Cart Button
        await driver.findElement(By.xpath("//div[@id='shopping_cart_container']/a[1]")).click();
 
    } finally {
        await driver.quit();
    }
}

sauceDemoLoginTest();