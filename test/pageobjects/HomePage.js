import BasePage from './BasePage';

class HomePage extends BasePage {
    selectors = {
        wdioRobotLogo: '//android.widget.ScrollView[@content-desc="Home-screen"]/android.view.ViewGroup/android.widget.ImageView[1]',
        webdriverText: '//android.widget.TextView[@text="WEBDRIVER"]',
        ioImage: '//android.widget.ScrollView[@content-desc="Home-screen"]/android.view.ViewGroup/android.widget.ImageView[2]',
        demoAppText: '//android.widget.TextView[@text="Demo app for the appium-boilerplate"]',
        iosLogo: '(//android.widget.TextView[@text="󰀵"])',
        androidLogo: '(//android.widget.TextView[@text="󰀲"])',
        supportText: '//android.widget.TextView[@text="Support"]'
    }

    // Метод для проверки элементов
    async verifyHomePageElements() {
        await expect(await $(this.selectors.wdioRobotLogo)).toBeDisplayed();
        await expect(await $(this.selectors.webdriverText)).toBeDisplayed();
        await expect(await $(this.selectors.ioImage)).toBeDisplayed();
        await expect(await $(this.selectors.demoAppText)).toBeDisplayed();
        await expect(await $(this.selectors.iosLogo)).toBeDisplayed();
        await expect(await $(this.selectors.androidLogo)).toBeDisplayed();
        await expect(await $(this.selectors.supportText)).toBeDisplayed();
    }
}

export default HomePage;
