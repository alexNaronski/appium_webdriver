import BasePage from './BasePage';

export const BUNDLE_ID = 'org.reactjs.native.example.wdiodemoapp';
export const CONTEXT_REF = {
    NATIVE_APP: 'NATIVE_APP',
    WEBVIEW: 'WEBVIEW',
};

class WebviewPage extends BasePage {
    async waitForWebViewContextAdded() {
        await driver.waitUntil(
            async () => {
                const currentContexts = await this.getCurrentContexts();
                const appIdentifier = driver.isIOS ? BUNDLE_ID : await driver.getCurrentPackage();

                return (
                    currentContexts.length > 1 &&
                    currentContexts.find((context) => {
                        if (driver.isIOS) {
                            return (
                                context.bundleId === appIdentifier &&
                                context.url !== 'about:blank'
                            );
                        }
                        return (
                            context.packageName === appIdentifier &&
                            context.androidWebviewData?.empty === false
                        );
                    })
                );
            },
            {
                timeout: 45000,
                timeoutMsg: 'Webview context not loaded',
                interval: 100,
            }
        );
    }


    async switchToContext({ context, title, url }) {
        if (context === CONTEXT_REF.NATIVE_APP) {
            return driver.switchContext(CONTEXT_REF.NATIVE_APP);
        }
    
        if (!title && !url) {
            console.warn(
                '\nTo get the best result, provide a title and/or URL which will be used to find the correct webview. The more information provided, the better the chance of success.\n'
            );
        }
    
        const currentContexts = await driver.getContexts();
        console.log('Available contexts:', currentContexts); // Добавлено здесь
    
        let matchingContext;
        let packageName;
    
        if (driver.isIOS) {
            matchingContext = this.findMatchingContext({
                contexts: currentContexts,
                identifier: BUNDLE_ID,
                title,
                url,
            });
        } else {
            packageName = await driver.getCurrentPackage();
            const webviewName = `WEBVIEW_${packageName}`;
            console.log('Switching to context:', webviewName);
            await driver.switchContext(webviewName);
            matchingContext = this.findMatchingContext({
                contexts: currentContexts,
                identifier: packageName,
                title,
                url,
            });
        }
    
        if (!matchingContext) {
            throw new Error(
                this.generateNonMatchingErrorMessage({
                    identifier: driver.isIOS ? BUNDLE_ID : packageName,
                    title,
                    url,
                })
            );
        }
    
        const switchFunction = driver.isIOS
            ? driver.switchContext.bind(driver)
            : driver.switchToWindow.bind(driver);
        return switchFunction(matchingContext.id);
    }

    findMatchingContext({ contexts, identifier, title, url }) {
        return contexts.find((context) => {
            const idMatch = driver.isIOS
                ? context.bundleId === identifier
                : context.packageName === identifier;
            const titleMatches = title ? context.title?.includes(title) : true;
            const urlMatches = url ? context.url?.includes(url) : true;
            const additionalChecks = driver.isIOS
                ? true
                : context.androidWebviewData?.attached &&
                  context.androidWebviewData?.visible;

            return idMatch && titleMatches && urlMatches && additionalChecks;
        });
    }

    generateNonMatchingErrorMessage({ identifier, title, url }) {
        let errorMessage = `The ${identifier} matches, but the provided `;
        if (title && url) {
            errorMessage += `title (${title}) or URL (${url}) do not match any context.`;
        } else if (title) {
            errorMessage += `title (${title}) does not match any context.`;
        } else if (url) {
            errorMessage += `URL (${url}) does not match any context.`;
        } else {
            errorMessage = `The identifier (${identifier}) matches, but no matching context is found.`;
        }
        return errorMessage;
    }

    async getCurrentContexts(elapsedTime = 0) {
        const contexts = await driver.execute('mobile: getContexts');

        if (driver.isIOS) {
            return contexts;
        }

        const packageName = await driver.getCurrentPackage();
        const parsedAndroidContexts = await this.parsedAndroidContexts(
            contexts,
            packageName
        );
        const androidContext = parsedAndroidContexts.find(
            (context) => context.packageName === packageName
        );

        if (
            !androidContext?.packageName ||
            !('androidWebviewData' in androidContext) ||
            androidContext.androidWebviewData?.empty
        ) {
            if (elapsedTime < 15000) {
                return new Promise((resolve) =>
                    setTimeout(
                        () => resolve(this.getCurrentContexts(elapsedTime + 100)),
                        100
                    )
                );
            }
            throw new Error(
                `The packageName '${packageName}' matches, but no webview with pages was loaded in this response: '${JSON.stringify(
                    contexts
                )}'`
            );
        }

        return parsedAndroidContexts;
    }

    async parsedAndroidContexts(contexts, packageName) {
        const currentWebviewName = `WEBVIEW_${packageName}`;

        const currentContext = contexts.find(
            (webview) => webview.webviewName === currentWebviewName
        );

        let result = [{ id: 'NATIVE_APP' }];

        if (!currentContext || !currentContext.pages) {
            return result;
        }

        const activePages = currentContext.pages
            .filter((page) => {
                if (page.type === 'page' && page.description) {
                    try {
                        const descriptionObj = JSON.parse(page.description);
                        return (
                            descriptionObj.attached === true &&
                            descriptionObj.visible === true
                        );
                    } catch (e) {
                        console.error(
                            'Failed to parse description:',
                            page.description
                        );
                        return false;
                    }
                }
                return false;
            })
            .map((page) => {
                const {
                    attached,
                    empty,
                    never_attached: neverAttached,
                    visible,
                } = JSON.parse(page.description);

                return {
                    id: page.id,
                    title: page.title,
                    url: page.url,
                    packageName,
                    webviewName: currentWebviewName,
                    androidWebviewData: {
                        attached,
                        empty,
                        neverAttached,
                        visible,
                    },
                };
            });

        return result.concat(activePages);
    }
}

export default WebviewPage;
