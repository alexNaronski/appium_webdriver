import Gestures from "../../helper/gestures";

let CAROUSEL_RECTANGLES;

class Carousel extends Gestures {
    get carousel() {        
        return $('//android.view.View[@resource-id="productCardContentList"]/android.view.View[1]');
    }

    get firstCard() {
        return $('//android.widget.TextView[@text="1"]');
    }
    get secondCard() {
        return $('//android.widget.TextView[@text="2"]');
    }
    get thirdCard() {
        return $('//android.widget.TextView[@text="3"]');
    }
    get fourthCard() {
        return $('//android.widget.TextView[@text="4"]');
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
            const isDisplayed = await card.isDisplayed();
            if (!isDisplayed) {
                console.log('[isCardActive] Card is not displayed.');
                return false;
            }
    
            const location = await card.getLocation();
            const size = await card.getSize();
            console.log(`[isCardActive] Card Location: ${JSON.stringify(location)}`);
            console.log(`[isCardActive] Card Size: ${JSON.stringify(size)}`);
    
            const screenSize = await driver.getWindowRect();
            console.log(`[isCardActive] Screen Size: ${JSON.stringify(screenSize)}`);
    
            const isInViewport = (
                location.x >= 0 &&
                location.y >= 0 &&
                location.x + size.width <= screenSize.width &&
                location.y + size.height <= screenSize.height
            );
    
            return isInViewport;
        } catch (error) {
            console.error(`[isCardActive] Error while checking card: ${error.message}`);
            throw error;
        }
    }

    async getCarouselRectangles() {
        if (!CAROUSEL_RECTANGLES) {
            const carouselElement = await this.carousel;
            const elementId = carouselElement.elementId;
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
