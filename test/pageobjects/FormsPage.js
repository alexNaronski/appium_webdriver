import BasePage from './BasePage';

class FormsPage extends BasePage {
    selectors = {
        formsComponentsText: '//android.widget.TextView[@text="Form components"]',
        inputField: '~text-input',
        inputTextResult: '~input-text-result',
        switch: '~switch',
        switchText: '~switch-text',
        dropdowm: '//android.widget.EditText[@resource-id="text_input"]',
        modal: '/hierarchy/android.widget.FrameLayout',
        wdioIsAwesomeText: '//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="webdriver.io is awesome"]',
        appiumIsAwesomeText: '//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="Appium is awesome"]',
        thisAppIsAwesomeText: '//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="This app is awesome"]',
        activeButton: '//android.widget.TextView[@text="Active"]',
        inactiveButton: '//android.view.ViewGroup[@content-desc="button-Inactive"]/android.view.ViewGroup',
        okButton: '//android.widget.Button[@resource-id="android:id/button1"]',
        cancelButton: '//android.widget.Button[@resource-id="android:id/button2"]',
        askMeLaterButton: '//android.widget.Button[@resource-id="android:id/button3"]',
    }

    async verifyFormsPageElements() {
        await expect(await $(this.selectors.formsComponentsText)).toBeDisplayed();
    }

    async enterText(text) {
        const inputField = await $(this.selectors.inputField);
        await inputField.setValue(text);
    }

    async verifyInputTextResult(text) {
        const inputTextResult = await $(this.selectors.inputTextResult).getText();
        await expect(inputTextResult).toContain(text);
    }

    async verifyAndToggleSwitchState() {
        // Получаем текущее состояние атрибута `checked` у свитча
        const isSwitchCheckedBefore = await $(this.selectors.switch).getAttribute('checked') === 'true';
        const switchTextBefore = await $(this.selectors.switchText).getText();

        // Проверка текста и состояния ДО клика
        if (isSwitchCheckedBefore) {
            await expect(switchTextBefore).toBe('Click to turn the switch OFF');
        } else {
            await expect(switchTextBefore).toBe('Click to turn the switch ON');
        }

        // Клик по свитчу
        await $(this.selectors.switch).click();

        // Получаем новое состояние атрибута `checked` после клика
        const isSwitchCheckedAfter = await $(this.selectors.switch).getAttribute('checked') === 'true';
        const switchTextAfter = await $(this.selectors.switchText).getText();

        // Проверка текста и состояния ПОСЛЕ клика
        if (isSwitchCheckedAfter) {
            await expect(switchTextAfter).toBe('Click to turn the switch OFF');
        } else {
            await expect(switchTextAfter).toBe('Click to turn the switch ON');
        }
    }

    async verifyModalVisibility() {
        await expect(await $(this.selectors.modal)).toBeDisplayed();
    }

    async dropdownClick() {
        await $(this.selectors.dropdowm).click();
    }

    async selectOption(){
        await $(this.selectors.wdioIsAwesomeText).click()
    }

    async verifyDropdownText() {
        const dropdownText = await $(this.selectors.dropdowm).getText()
        await expect(dropdownText).toBe('webdriver.io is awesome');
    }

    async verifyInactiveButton(){
        const inactiveStatus = await $(this.selectors.inactiveButton).getAttribute('clickable');
        await expect(inactiveStatus).toBe('false');
    }

    async clickActiveButton() {
        await $(this.selectors.activeButton).click();
    }

    async verifyElementsVisibility() {
        await expect(await $(this.selectors.modal)).toBeDisplayed();
        await expect(await $(this.selectors.okButton)).toBeDisplayed();
        await expect(await $(this.selectors.cancelButton)).toBeDisplayed();
        await expect(await $(this.selectors.askMeLaterButton)).toBeDisplayed();
    }

    





}

export default FormsPage;
