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
        // Проверяем, что открытая карточка — это первая карточка
        await expect(await Carousel.isCardActive(await Carousel.openSourceCard)).toBeTruthy();

        // Свайпаем влево и проверяем, что активная карточка теперь вторая
        await Carousel.swipeLeft();
        await expect(await Carousel.isCardActive(await Carousel.communityCard)).toBeTruthy();

        // Свайпаем еще раз влево и проверяем, что активная карточка теперь третья
        await Carousel.swipeLeft();
        await expect(await Carousel.isCardActive(await Carousel.jsFoundationCard)).toBeTruthy();

        // Свайпаем еще раз влево и проверяем, что активная карточка теперь четвертая
        await Carousel.swipeLeft();
        await expect(await Carousel.isCardActive(await Carousel.supportVideosCard)).toBeTruthy();

        // Свайпаем влево еще два раза, чтобы попасть на карточку "Compatible"
        await Carousel.swipeLeft();
        await Carousel.swipeLeft();
        await expect(await Carousel.isCardActive(await Carousel.compatibleCard)).toBeTruthy();

        // Свайпаем вправо и проверяем, что активная карточка теперь "Extendable"
        await Carousel.swipeRight();
        await expect(await Carousel.isCardActive(await Carousel.extendableCard)).toBeTruthy();

        // Свайпаем вправо несколько раз и проверяем, что карточка вернется в исходное положение (первая карточка)
        await Carousel.swipeRight();
        await Carousel.swipeRight();
        await Carousel.swipeRight();
        await Carousel.swipeRight();
        await expect(await Carousel.isCardActive(await Carousel.openSourceCard)).toBeTruthy();
    });


    it('should swipe and find the element', async () => {
        const webDriverLogo = await swipePage.getWebDriverLogo();
        const swipeScreen = await swipePage.getSwipeScreen();

        // Прокручиваем до элемента
        await Gestures.checkIfDisplayedWithSwipe({
            scrollContainer: swipeScreen,
            searchableElement: webDriverLogo,
            maxScrolls: 3,
            direction: DIRECTIONS.UP,
        });

        // Проверяем, что элемент отображается после прокрутки
        const isDisplayed = await webDriverLogo.isDisplayed();
        await expect(isDisplayed).toBe(true);  // Убеждаемся, что элемент стал видимым
    });
});
