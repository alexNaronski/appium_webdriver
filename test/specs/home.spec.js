import HomePage from '../pageobjects/HomePage';

describe('Home Test', () => {
    let homePage;

    before(async () => {
        homePage = new HomePage();
    });

    it('should navigate to the Home tab', async () => {
        await homePage.navigateToTab('Home');
        await homePage.verifyHomePageElements();
    });
});
