import BasePage from './BasePage';

class SelectCountryPage extends BasePage {
    selectors = {
        by: '//android.view.View[@resource-id="by"]',
        searchField: '//android.widget.TextView[@text="Поиск"]',
        field: '//android.widget.EditText',
        option: '//android.widget.TextView[@text="открывашка"]',
        productTitle: '//android.widget.TextView[@content-desc="Товар Открывашка c деревянной ручкой"]',
        brand: '//android.widget.TextView[@content-desc="Бренд MrSh"]',
        rating: '//android.view.View[@resource-id="rating"]',
        backButton: '//android.widget.ImageView[@content-desc="Назад"]',
        fieldWithSearch: '//android.widget.TextView[@resource-id="com.wildberries.ru:id/toolbarClickTitle"]',
    }

    async selectbelarus() {
        const by = await $(this.selectors.by);
        await by.click();
    }

    async clickSearchField() {
        const searchField = await $(this.selectors.searchField);
        await searchField.click();
    }

    async clickBrand() {
        const itemBrand = await $(this.selectors.brand);
        await itemBrand.click();
    }

    async clickBackButton() {
        const backButton = await $(this.selectors.backButton);
        await backButton.click();
    }

    async enterText(text) {
        const field = await $(this.selectors.field);
        await field.setValue(text);
        const option = await $(this.selectors.option);
        await option.click();
    }

    async enterTextWithEmojisAndEnter() {
        const field = await $(this.selectors.field);
        await field.clearValue();

        await field.setValue('открывашка\u2764\uFE0F\u{1F60A}\u{1F44D}');
    
        await driver.pressKeyCode(66);
    }

    async verifyTextField() {
        const fieldWithSearch = await $(this.selectors.fieldWithSearch);
        const actualText = await fieldWithSearch.getText();
    
        const expectedText = 'открывашка\u2764\uFE0F\u{1F60A}\u{1F44D}';
    
        if (actualText === expectedText) {
            console.log('Текст в поле ввода совпадает с ожидаемым.');
        } else {
            throw new Error(`Текст в поле ввода не совпадает. Ожидалось: "${expectedText}", получено: "${actualText}"`);
        }
    }

    
    async verifySuccessAlertVisibility(title, text) {
        await expect(await $(this.selectors.successTitle)).toBeDisplayed();
        
        const successTitleText = await $(this.selectors.successTitle).getText();
        await expect(successTitleText).toContain(title);
    
        await expect(await $(this.selectors.successAlertText)).toBeDisplayed();
        
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
