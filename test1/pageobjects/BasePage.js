class BasePage {

    async navigateToTab(tabName) {
        const tabElement = await $(`~${tabName}`);
        await tabElement.click();
    }

    async dontAllowNotifications(){
        const dontAllowButton = await $('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_deny_button"]')
        await dontAllowButton.click()
    }
}

export default BasePage;