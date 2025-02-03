import Gestures from "../../../helper/gestures";

let CAROUSEL_RECTANGLES;

class Carousel extends Gestures {
    get carousel() {
        return $('//android.view.ViewGroup[@content-desc="Carousel"]/android.view.ViewGroup/android.view.ViewGroup');
    }
    get openSourceCard() {
        return $(this.locatorStrategy("__CAROUSEL_ITEM_0_READY__"));
    }
    get communityCard() {
        return $(this.locatorStrategy("__CAROUSEL_ITEM_1_READY__"));
    }
    get jsFoundationCard() {
        return $(this.locatorStrategy("__CAROUSEL_ITEM_2_READY__"));
    }
    get supportVideosCard() {
        return $(this.locatorStrategy("__CAROUSEL_ITEM_3_READY__"));
    }
    get extendableCard() {
        return $(this.locatorStrategy("__CAROUSEL_ITEM_4_READY__"));
    }
    get compatibleCard() {
        return $(this.locatorStrategy("__CAROUSEL_ITEM_5_READY__"));
    }

    locatorStrategy(selector) {
        const strategy = driver.isIOS ? `~${selector}` : `//*[@resource-id="${selector}"]`;
        console.log(`[Locator Strategy] Platform: ${driver.isIOS ? "iOS" : "Android"}, Strategy: ${strategy}`);
        return strategy;
    }

    async waitForIsDisplayed(isShown = true) {
        console.log(`[waitForIsDisplayed] Waiting for carousel to be ${isShown ? "shown" : "hidden"}`);
        await this.carousel.waitForDisplayed({
            reverse: !isShown,
        });
        console.log(`[waitForIsDisplayed] Carousel is now ${isShown ? "visible" : "hidden"}`);
    }

    async isCardActive(card) {
        console.log(`[isCardActive] Checking if card is active. Card: ${JSON.stringify(card)}`);
        try {
            const cardRectangles = await driver.getElementRect(card.elementId);
            console.log(`[isCardActive] Card Rectangles: ${JSON.stringify(cardRectangles)}`);
            return cardRectangles.x === 0;
        } catch (error) {
            console.error(`[isCardActive] Error while getting card rectangles: ${error.message}`);
            throw error;
        }
    }

    async getCarouselRectangles() {
        if (!CAROUSEL_RECTANGLES) {
            const carouselElement = await this.carousel; // Убедимся, что это элемент
            const elementId = carouselElement.elementId; // Получаем elementId
            if (!elementId) {
                console.error("[getCarouselRectangles] Element ID is missing for carousel.");
                throw new Error("Carousel element is not found or does not have a valid ID.");
            }
            CAROUSEL_RECTANGLES = await driver.getElementRect(elementId);
        }
        return CAROUSEL_RECTANGLES;
    }
    

    async swipeLeft() {
        console.info("[swipeLeft] Starting swipe left action...");
        try {
            const carouselRectangles = await this.getCarouselRectangles();
            console.info("[swipeLeft] Carousel Rectangles: ", carouselRectangles);
    
            const y = Math.round(carouselRectangles.y + carouselRectangles.height / 2);
            console.info(`[swipeLeft] Calculated swipe coordinates: y=${y}`);
    
            await Gestures.executeGesture({
                from: {
                    x: Math.round(carouselRectangles.width - carouselRectangles.width * 0.1),
                    y,
                },
                to: {
                    x: Math.round(carouselRectangles.x + carouselRectangles.width * 0.1),
                    y,
                },
            });
    
            console.info("[swipeLeft] Swipe action completed.");
        } catch (error) {
            console.error("[swipeLeft] Error while swiping left:", error);
            throw error;
        }
    }
    
    async swipeRight() {
        console.info("[swipeRight] Starting swipe right action...");
        try {
            const carouselRectangles = await this.getCarouselRectangles();
            console.info("[swipeRight] Carousel Rectangles: ", carouselRectangles);
    
            const y = Math.round(carouselRectangles.y + carouselRectangles.height / 2);
            console.info(`[swipeRight] Calculated swipe coordinates: y=${y}`);
    
            await Gestures.executeGesture({
                from: {
                    x: Math.round(carouselRectangles.x + carouselRectangles.width * 0.1),
                    y,
                },
                to: {
                    x: Math.round(carouselRectangles.width - carouselRectangles.width * 0.1),
                    y,
                },
            });
    
            console.info("[swipeRight] Swipe action completed.");
        } catch (error) {
            console.error("[swipeRight] Error while swiping right:", error);
            throw error;
        }
    }
    
}

export default new Carousel();
