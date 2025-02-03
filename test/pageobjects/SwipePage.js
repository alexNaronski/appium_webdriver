import BasePage from './BasePage';

class SwipePage extends BasePage {
    selectors = {
        webDriverLogo: '~WebdriverIO logo',
        card: '//android.view.ViewGroup[@content-desc="card"]',
        swipeScreen: '//android.widget.ScrollView[@content-desc="Swipe-screen"]/android.view.ViewGroup'
    };

    async waitForPageToLoad() {
        await $(this.selectors.card).waitForDisplayed();
    }

    async getWebDriverLogo() {
        return $(this.selectors.webDriverLogo);
    }

    async getCardElement() {
        return $(this.selectors.card);
    }

    async getSwipeScreen() {
        return $(this.selectors.swipeScreen);
    }
}

export default SwipePage; // Экспортируем сам класс
