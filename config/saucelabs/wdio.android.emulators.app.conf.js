const { config: baseConfig } = require('./wdio.shared.sauce.conf.js');

const buildName = `WebdriverIO Native Demo app, Android Emulators: ${new Date().getTime()}`;

module.exports.config = {
    ...baseConfig,

    specs: [
        '../../test1/specs/**/*.js',
    ],

    capabilities: [
        {
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',
            'appium:appPackage': 'com.wildberries.ru',
            'appium:appActivity': 'ru.wildberries.SplashActivity',
            'appium:app': 'sauce-storage:wb-app-android.apk',
            'appium:newCommandTimeout': 600,
            'sauce:options': {
                build: buildName,
                appiumVersion: '2.0.0',
            },
        },
    ],
    maxInstances: 1,
    logLevel: 'debug',
    outputDir: './logs',
};
