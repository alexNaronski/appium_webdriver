import SelectCountryPage from '../pageobjects/SelectCountryPage';
import Carousel from '../components/Carousel'
import SwipePage from '../pageobjects/SwipePage';
import Gestures from '../../helper/gestures';
import { DIRECTIONS } from '../../helper/gestures';

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

    it('should select Belarus and see homepage', async () => {
        await selectCountryPage.clickSearchField()
        //await selectCountryPage.enterText('открывашка')
        await selectCountryPage.enterTextWithEmojisAndEnter()
        await swipePage.waitForPageToLoad2();
        await selectCountryPage.verifyTextField()
        //await swipePage.waitForPageToLoad2();

        const swipeScreen = await swipePage.getSwipeScreen();
        const brand = await swipePage.getBrand();

        await Gestures.checkIfDisplayedWithSwipe({
            scrollContainer: swipeScreen,
            searchableElement: brand,
            maxScrolls: 7,
            direction: DIRECTIONS.UP,
        });

        const isDisplayed = await brand.isDisplayed();
        await expect(isDisplayed).toBe(true);
        await selectCountryPage.clickBrand()

        await swipePage.waitForPageToLoad3();

        await expect(await Carousel.isCardActive(await Carousel.firstCard)).toBeTruthy();
        
        await Carousel.swipeLeft();
        await expect(await Carousel.isCardActive(await Carousel.secondCard)).toBeTruthy();
        
        await Carousel.swipeLeft();
        await expect(await Carousel.isCardActive(await Carousel.thirdCard)).toBeTruthy();
        
        await Carousel.swipeLeft();
        await expect(await Carousel.isCardActive(await Carousel.fourthCard)).toBeTruthy();
        


    });

});


