const { config: baseConfig } = require('../wdio.shared.conf.js');

module.exports.config = {
    ...baseConfig,

    services: [
        ...baseConfig.services || [],
        [
            'sauce',
            {},
        ],
    ],

    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    region: process.env.REGION || 'us',

    connectionRetryTimeout: 180000,

    specFileRetries: 2,

    logLevel: 'silent',
};
