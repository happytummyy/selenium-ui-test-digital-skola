const { By } = require('selenium-webdriver');

class DashboardPage {
    constructor(driver){
        this.driver = driver;
    }

    async isOnDashboard(){
        const title = await this.driver.findElement(By.className('title'));
        return title.getText();
    }

    async isOnBody(){
        const title = await this.driver.findElement(By.className('complete-header'));
        return title.getText();
    }

}

module.exports = DashboardPage;