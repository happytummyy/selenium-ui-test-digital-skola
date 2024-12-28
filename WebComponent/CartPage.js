const { By } = require('selenium-webdriver');

class CartPage {
    constructor(driver){
        this.driver = driver;
        //add items to cart
        this.addItem1 = By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']");
        this.addItem2 = By.xpath("//button[@id='add-to-cart-sauce-labs-bike-light']");
        this.addItem3 = By.xpath("//button[@id='add-to-cart-sauce-labs-bolt-t-shirt']");
        this.addItem4 = By.xpath("//button[@id='add-to-cart-sauce-labs-fleece-jacket']");
        this.addItem5 = By.xpath("//button[@id='add-to-cart-sauce-labs-onesie']");
        this.addItem6 = By.xpath("//button[@id='add-to-cart-test.allthethings()-t-shirt-(red)']");

        //CLick Cart Button
        this.cartButton = By.xpath("//div[@id='shopping_cart_container']/a[1]");

        //Click Checkout Button
        this.checkoutButton = By.xpath("//button[@id='checkout']");
    }

    async addToCart(){
        await this.driver.findElement(this.addItem1).click();
        await this.driver.findElement(this.addItem2).click();
        await this.driver.findElement(this.addItem3).click();
        await this.driver.findElement(this.addItem4).click();
        await this.driver.findElement(this.addItem5).click();
        await this.driver.findElement(this.addItem6).click();

        await this.driver.findElement(this.cartButton).click();
    }

    async checkOut(){
        await this.driver.findElement(this.checkoutButton).click();
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

module.exports = CartPage;