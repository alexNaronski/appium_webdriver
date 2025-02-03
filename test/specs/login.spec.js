import LoginPage from '../pageobjects/LoginPage';
import { testUser } from '../../helper/users'

describe('Login Test', () => {
    let loginPage;

    before(async () => {
        loginPage = new LoginPage();
    });

    it('should navigate to the Login tab', async () => {
        await loginPage.navigateToTab('Login');
        await loginPage.verifyLoginPageElements()
    });

    it('should login with valid credentials', async () => {
        await loginPage.navigateToTab('Login');
        await loginPage.enterEmail(testUser.email)
        await loginPage.enterPassword(testUser.password)
        await loginPage.clickLoginButton()
        await loginPage.verifySuccessAlertVisibility('Success', 'You are logged in!')
        await loginPage.clickOkButton()
        await loginPage.verifySuccessAlertNotVisible()
    });

    it('should see Email error', async () => {
        await loginPage.navigateToTab('Login');
        await loginPage.enterEmail('test')
        await loginPage.enterPassword(testUser.password)
        await loginPage.clickLoginButton()
        await loginPage.verifyEmailErrorVisibility()
    });

    it('should see Password error', async () => {
        await loginPage.navigateToTab('Login');
        await loginPage.enterEmail(testUser.email)
        await loginPage.enterPassword('1234567')
        await loginPage.clickLoginButton()
        await loginPage.verifyPasswordErrorVisibility()
    });

    it('should see Email error in SignUp tab', async () => {
        await loginPage.navigateToTab('Login');
        await loginPage.navigateToSignUpTab()
        await loginPage.enterEmail('test')
        await loginPage.enterPassword(testUser.password)
        await loginPage.enterConfirmPassword(testUser.password)
        await loginPage.clickSignUpButton()
        await loginPage.verifyEmailErrorVisibility()
    });

    it('should see Password error in SignUp tab', async () => {
        await loginPage.navigateToTab('Login');
        await loginPage.navigateToSignUpTab()
        await loginPage.enterEmail(testUser.email)
        await loginPage.enterPassword('1234567')
        await loginPage.enterConfirmPassword(testUser.password)
        await loginPage.clickSignUpButton()
        await loginPage.verifyPasswordErrorVisibility()
    });

    it('should see Confirm Password error in SignUp tab', async () => {
        await loginPage.navigateToTab('Login');
        await loginPage.navigateToSignUpTab()
        await loginPage.enterEmail(testUser.email)
        await loginPage.enterPassword(testUser.password)
        await loginPage.enterConfirmPassword('test1111')
        await loginPage.clickSignUpButton()
        await loginPage.verifyConfirmPasswordErrorVisibility()
    });

    it('should see success Sign Up', async () => {
        await loginPage.navigateToTab('Login');
        await loginPage.navigateToSignUpTab()
        await loginPage.enterEmail(testUser.email)
        await loginPage.enterPassword(testUser.password)
        await loginPage.enterConfirmPassword(testUser.password)
        await loginPage.clickSignUpButton()
        await loginPage.verifySuccessAlertVisibility('Signed Up!', 'You successfully signed up!')
        await loginPage.clickOkButton()
        await loginPage.verifySuccessAlertNotVisible()
    });



});
