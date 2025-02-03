import WebviewPage from '../pageobjects/WebviewPage';


describe('Webview Test', () => {
    let webviewPage;
    const CONTEXT_REF = {
        NATIVE_APP: 'NATIVE_APP',
        WEBVIEW: 'WEBVIEW',
    };

    before(async () => {
        webviewPage = new WebviewPage();
    });

    beforeEach(async () => {
        await webviewPage.navigateToTab('Webview');
    });

    it("should be able search for the url method and open it", async () => {

        await webviewPage.waitForWebViewContextAdded()
        const contexts = await driver.getContexts();
        const webviewContext = contexts.find(context => context.includes('WEBVIEW'));
        await driver.switchContext(webviewContext);
        await $(".DocSearch").click();
        await $(".DocSearch-Input").setValue("url");
        await driver.waitUntil(async () =>
            (await $(".DocSearch-HitsFooter").getText()).includes("See all")
        );
        await $("#docsearch-hits0-item-0").click();

        await $("h1").waitForDisplayed({ timeout: 3000 });
        await expect(await driver.getTitle()).toEqual("url | WebdriverIO");

        await webviewPage.switchToContext({
            context: CONTEXT_REF.NATIVE_APP,
        });
    });
});
