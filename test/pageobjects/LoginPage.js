import BasePage from './BasePage';

class LoginPage extends BasePage {
    selectors = {
        loginSignupText: '//android.widget.TextView[@text="Login / Sign up Form"]',
        loginTab: '(//android.widget.TextView[@text="Login"])[1]',
        signupTab: '//android.widget.TextView[@text="Sign up"]',
        emailField: '~input-email',
        passwordField: '~input-password',
        confirmPasswordField: '~input-repeat-password',
        loginButton: '//android.view.ViewGroup[@content-desc="button-LOGIN"]/android.view.ViewGroup',
        signupButton: '//android.view.ViewGroup[@content-desc="button-SIGN UP"]/android.view.ViewGroup',
        successTitle: '//android.widget.TextView[@resource-id="android:id/alertTitle"]',
        successAlertText: '//android.widget.TextView[@resource-id="android:id/message"]',
        okButton: '//android.widget.Button[@resource-id="android:id/button1"]',
        invalidAddressError: '//android.widget.TextView[@text="Please enter a valid email address"]',
        passwordLess8Error: '//android.widget.TextView[@text="Please enter at least 8 characters"]',
        samePasswordError: '//android.widget.TextView[@text="Please enter the same password"]',

    }

    async verifyLoginPageElements() {
        await expect(await $(this.selectors.loginSignupText)).toBeDisplayed();
    }

    async navigateToLoginTab() {
        const loginTab = await $(this.selectors.loginTab);
        await loginTab.click();
    }

    async navigateToSignUpTab() {
        const signUpTab = await $(this.selectors.signupTab);
        await signUpTab.click();
    }

    async enterEmail(email) {
        const emailField = await $(this.selectors.emailField);
        await emailField.setValue(email);
    }

    async enterPassword(password) {
        const passwordField = await $(this.selectors.passwordField);
        await passwordField.setValue(password);
    }

    async enterConfirmPassword(confirmPassword) {
        const confirmPasswordField = await $(this.selectors.confirmPasswordField);
        await confirmPasswordField.setValue(confirmPassword);
    }

    async clickLoginButton() {
        const loginButton = await $(this.selectors.loginButton);
        await loginButton.click();
    }

    async clickSignUpButton() {
        const signUpButton = await $(this.selectors.signupButton);
        await signUpButton.click();
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
    

    async clickOkButton() {
        const okButton = await $(this.selectors.okButton);
        await okButton.click();
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

export default LoginPage;
