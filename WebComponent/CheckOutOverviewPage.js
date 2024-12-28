const { By } = require('selenium-webdriver');

class CheckOutOverviewPage {
    constructor(driver){
        this.driver = driver;
        
        this.finishButton = By.xpath("//button[@id='finish']");
        this.errorMessage = By.css('.error-message-container');
    }

    async navigate(browser){
        await this.driver.get(browser);
    }

    async checkoutFinish(){
        await this.driver.findElement(this.finishButton).click();
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

module.exports = CheckOutOverviewPage;