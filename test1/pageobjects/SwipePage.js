import BasePage from './BasePage';

class SwipePage extends BasePage {
    selectors = {
        brand: '//android.widget.TextView[@content-desc="Shiny Kitchen"]',
        productTitle: '//android.widget.TextView[@content-desc="Товар Открывашка c деревянной ручкой"]',
        card: '(//androidx.cardview.widget.CardView[@resource-id="com.wildberries.ru:id/imagesPagerCard"])/android.widget.FrameLayout',
        card2: '(//androidx.cardview.widget.CardView[@resource-id="com.wildberries.ru:id/imagesPagerCard"])[1]/android.widget.FrameLayout',
        swipeScreen1: '//android.widget.ScrollView[@resource-id="com.wildberries.ru:id/catalogCoordinator"]',
        card3: '//android.view.View[@resource-id="productCardContentList"]/android.view.View[1]'
    };

    async waitForPageToLoad() {
        await $(this.selectors.card).waitForDisplayed();
    }

    async waitForPageToLoad2() {
        await $(this.selectors.card2).waitForDisplayed();
    }

    async waitForPageToLoad3() {
        await $(this.selectors.card3).waitForDisplayed();
    }

    async getBrand() {
        return $(this.selectors.brand);
    }

    async getCardElement() {
        return $(this.selectors.card);
    }

    async getSwipeScreen() {
        return $(this.selectors.swipeScreen1);
    }
}

export default SwipePage;
