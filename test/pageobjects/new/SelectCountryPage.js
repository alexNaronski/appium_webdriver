import BasePage from './BasePage';

class SelectCountryPage extends BasePage {
    selectors = {
        by: '//android.view.View[@resource-id="by"]',
        searchField: '//android.widget.TextView[@text="Поиск"]',
        field: '//android.widget.EditText',


    }

    async selectbelarus() {
        const by = await $(this.selectors.by);
        await by.click();
    }

    async clickSearchField() {
        const searchField = await $(this.selectors.searchField);
        await searchField.click();
    }

    async enterText(text) {
        const field = await $(this.selectors.field);
        await field.setValue(text);
        await driver.pressKeyCode(66);
    }

    
    async verifySuccessAlertVisibility(title, text) {
        await expect(await $(this.selectors.successTitle)).toBeDisplayed();
        
        // Получаем текст из successTitle и проверяем, что он содержит ожидаемый title
        const successTitleText = await $(this.selectors.successTitle).getText();
        await expect(successTitleText).toContain(title);
    
        await expect(await $(this.selectors.successAlertText)).toBeDisplayed();
        
        // Получаем текст из successAlertText и проверяем, что он содержит ожидаемый text
        const successAlertText = await $(this.selectors.successAlertText).getText();
        await expect(successAlertText).toContain(text);
        
        await expect(await $(this.selectors.okButton)).toBeDisplayed();
    }
    
     
    async verifySuccessAlertNotVisible() {
        await expect(await $(this.selectors.successTitle)).not.toBeDisplayed();
        await expect(await $(this.selectors.successAlertText)).not.toBeDisplayed();
        await expect(await $(this.selectors.okButton)).not.toBeDisplayed();
    }
    
    async verifyEmailErrorVisibility() {
        await expect(await $(this.selectors.invalidAddressError)).toBeDisplayed();
    }

    async verifyPasswordErrorVisibility() {
        await expect(await $(this.selectors.passwordLess8Error)).toBeDisplayed();
    }

    async verifyConfirmPasswordErrorVisibility() {
        await expect(await $(this.selectors.samePasswordError)).toBeDisplayed();
    }
        


}

export default SelectCountryPage;
