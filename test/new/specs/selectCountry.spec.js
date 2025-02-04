import SelectCountryPage from '../../pageobjects/new/SelectCountryPage';
import Carousel from '../../pageobjects/components/Carousel'
import SwipePage from '../../pageobjects/new/SwipePage';

describe('Login Test', () => {
    let selectCountryPage;
    let swipePage;

    before(async () => {
        selectCountryPage = new SelectCountryPage();
        swipePage = new SwipePage();
        await selectCountryPage.dontAllowNotifications()
        await selectCountryPage.selectbelarus()
        await swipePage.waitForPageToLoad();
    });

    /*it('should select Belarus and see homepage', async () => {
        await expect(await Carousel.isCardActive(await Carousel.first)).toBeTruthy();

        await Carousel.swipeLeft();
        await expect(await Carousel.isCardActive(await Carousel.oblakoPodarkov)).toBeTruthy();
    });*/

    it('should select Belarus and see homepage', async () => {
        await selectCountryPage.clickSearchField()
        await selectCountryPage.enterText('открывашка')
    });

    /*it('should swipe and find the element', async () => {
        const webDriverLogo = await swipePage.getWebDriverLogo();
        const swipeScreen = await swipePage.getSwipeScreen();

        await Gestures.checkIfDisplayedWithSwipe({
            scrollContainer: swipeScreen,
            searchableElement: webDriverLogo,
            maxScrolls: 7,
            direction: DIRECTIONS.UP,
        });

        const isDisplayed = await webDriverLogo.isDisplayed();
        await expect(isDisplayed).toBe(true);
    });*/

});


