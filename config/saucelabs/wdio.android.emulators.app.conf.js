import { config as baseConfig } from './wdio.shared.sauce.conf.js';

const buildName = `WebdriverIO Native Demo app, Android Emulators: ${new Date().getTime()}`;

export const config = {
    ...baseConfig,

    // ============
    // Specs
    // ============
    specs: [
        '../../test/specs/**/*.js',
    ],

    capabilities: [
        {
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',
            'appium:udid': 'emulator-5554',
            //'appium:appPackage': 'com.wildberries.ru',
            //'appium:appActivity': 'ru.wildberries.SplashActivity',
            //'appium:app': 'C:\\Work\\mobile_tests\\app\\com.wildberries.ru_60800_rs.apk',
            'appium:appPackage': 'com.wdiodemoapp',
            'appium:appActivity': '.MainActivity',
            'appium:app': 'app/android.wdio.native.app.v1.0.8.apk',
            'appium:enableWebviewDetailsCollection': true,
            'appium:allowInsecure': ['chromedriver_autodownload'],
            "appium:showChromedriverLog": true,
            'appium:chromedriverAutodownload': true,
            'appium:chromedriverExecutable': 'app/chromedriver.exe',
            'appium:newCommandTimeout': 600,
            'sauce:options':{
                // Group builds by build name
                build: buildName,
                // Provide the Appium version
                appiumVersion: '2.0.0'
            },
        },
    ],
    maxInstances: 25,
};
