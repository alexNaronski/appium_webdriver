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
            //'appium:udid': 'emulator-5554',
            //'appium:appPackage': 'com.wdiodemoapp',
            //'appium:appActivity': '.MainActivity',
            'appium:appPackage': 'com.wildberries.ru',
            'appium:appActivity': 'ru.wildberries.SplashActivity',
            'appium:app': 'app/android.wdio.native.app.v1.0.8.apk',
            //'appium:app': 'sauce-storage:wdio-demo-app-android.apk',
            //'appium:enableWebviewDetailsCollection': true,
            //'appium:allowInsecure': ['chromedriver_autodownload'],
            //"appium:showChromedriverLog": true,
            //'appium:chromedriverAutodownload': true,
            //'appium:chromedriverExecutable': 'app/chromedriver.exe',
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
