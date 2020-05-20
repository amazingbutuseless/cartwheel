const WebsiteScreenCapture = require('./website_screen_capture');

(async (props) => {
    const handler = new WebsiteScreenCapture(props.url, props.authenticate);
    await handler.run(props.ignoreHTTPSErrors);

})({
    // url: 'https://local.oxfordreadingclub.com',
    url: 'https://local.oxfordreadingclub.com/user/login',
    authenticate: {
        'url': 'https://local.oxfordreadingclub.com/user/login',
        'loginid': 'kleeinvn',
        'password': 'Spindle1234',
    },
    deviceType: 'desktop',
    ignoreHTTPSErrors: true
});
