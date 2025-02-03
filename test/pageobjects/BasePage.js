class BasePage {

    async navigateToTab(tabName) {

        const tabElement = await $(`~${tabName}`);
        await tabElement.click();
    }
}

export default BasePage;