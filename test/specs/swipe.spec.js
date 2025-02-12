import SwipePage from '../pageobjects/SwipePage';
import Gestures from '../../helper/gestures';
import { DIRECTIONS } from '../../helper/gestures';
import Carousel from '../pageobjects/components/Carousel'

describe('Swipe Test', () => {
    let swipePage;

    before(async () => {
        swipePage = new SwipePage();
    });

    beforeEach(async () => {
        await swipePage.navigateToTab('Swipe');
        await swipePage.waitForPageToLoad();
    });

    it('should be able to swipe horizontally by swiping the carousel from left to right', async () => {
        await expect(await Carousel.isCardActive(await Carousel.openSourceCard)).toBeTruthy();

        await Carousel.swipeLeft();
        await expect(await Carousel.isCardActive(await Carousel.communityCard)).toBeTruthy();

        await Carousel.swipeLeft();
        await expect(await Carousel.isCardActive(await Carousel.jsFoundationCard)).toBeTruthy();

        await Carousel.swipeLeft();
        await expect(await Carousel.isCardActive(await Carousel.supportVideosCard)).toBeTruthy();

        await Carousel.swipeLeft();
        await Carousel.swipeLeft();
        await expect(await Carousel.isCardActive(await Carousel.compatibleCard)).toBeTruthy();

        await Carousel.swipeRight();
        await expect(await Carousel.isCardActive(await Carousel.extendableCard)).toBeTruthy();

        await Carousel.swipeRight();
        await Carousel.swipeRight();
        await Carousel.swipeRight();
        await Carousel.swipeRight();
        await expect(await Carousel.isCardActive(await Carousel.openSourceCard)).toBeTruthy();
    });


    it('should swipe and find the element', async () => {
        const webDriverLogo = await swipePage.getWebDriverLogo();
        const swipeScreen = await swipePage.getSwipeScreen();

        await Gestures.checkIfDisplayedWithSwipe({
            scrollContainer: swipeScreen,
            searchableElement: webDriverLogo,
            maxScrolls: 3,
            direction: DIRECTIONS.UP,
        });

        const isDisplayed = await webDriverLogo.isDisplayed();
        await expect(isDisplayed).toBe(true);
    });
});
