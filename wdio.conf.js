const { config: sauceConfig } = require('./config/saucelabs/wdio.shared.sauce.conf.js');


exports.config = {
    ...sauceConfig,
    runner: 'local',
    port: 4723,
    specs: [
        './test1/specs/**/*.js'
    ],
    exclude: [
    ],


    maxInstances: 1,    
    capabilities: [
        {
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',
            'appium:udid': 'emulator-5554',
            'appium:appPackage': 'com.wildberries.ru',
            'appium:appActivity': 'ru.wildberries.SplashActivity',
            'appium:app': 'C:\\Work\\mobile_tests\\app\\com.wildberries.ru_60800_rs.apk',
            //'appium:appPackage': 'com.wdiodemoapp',
            //'appium:appActivity': '.MainActivity',
            //'appium:app': 'app/android.wdio.native.app.v1.0.8.apk',
            //'appium:enableWebviewDetailsCollection': true,
            //'appium:allowInsecure': ['chromedriver_autodownload'],
            //"appium:showChromedriverLog": true,
            //'appium:chromedriverAutodownload': true,
            //'appium:chromedriverExecutable': 'app/chromedriver.exe',
            'appium:newCommandTimeout': 600
        }
    ],
    services: [
        'appium',
        ['chromedriver', {
            autoUpdate: true
        }]
    ],
    
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 100000,
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
}
