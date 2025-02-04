import BasePage from './BasePage';

class SwipePage extends BasePage {
    selectors = {
        webDriverLogo: '~WebdriverIO logo',
        card: '(//androidx.cardview.widget.CardView[@resource-id="com.wildberries.ru:id/imagesPagerCard"])/android.widget.FrameLayout',
        swipeScreen1: '//android.widget.GridView[@resource-id="com.wildberries.ru:id/contentRecycler"]/androidx.compose.ui.platform.ComposeView'
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

export default SwipePage;
