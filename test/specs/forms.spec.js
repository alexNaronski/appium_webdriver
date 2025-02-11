import FormsPage from '../pageobjects/FormsPage';

describe('Forms Test', () => {
    let formsPage;

    before(async () => {
        formsPage = new FormsPage();
    });

    it('should navigate to the Forms tab', async () => {
        await formsPage.navigateToTab('Forms')
        await formsPage.verifyFormsPageElements()
    });

    it('verify input text result', async () => {
        await formsPage.navigateToTab('Forms')
        await formsPage.enterText('testText')
        await formsPage.verifyInputTextResult('testText')

    });

    it('verify and toggle switch', async () => {
        await formsPage.navigateToTab('Forms')
        await formsPage.verifyAndToggleSwitchState()

    });

    it('verify dropdown', async () => {
        await formsPage.navigateToTab('Forms')
        await formsPage.dropdownClick()
        await formsPage.verifyModalVisibility()
        await formsPage.selectOption()
        await formsPage.verifyDropdownText()
    });

    it('verify inactive button', async () => {
        await formsPage.navigateToTab('Forms')
        await formsPage.verifyInactiveButton()
    });

    it('verify active button', async () => {
        await formsPage.navigateToTab('Forms')
        await formsPage.clickActiveButton()
        await formsPage.verifyElementsVisibility()

    });

 


});
