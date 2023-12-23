const withTM = require('next-transpile-modules')(['@square/web-sdk', 'react-square-web-payments-sdk'])

module.exports = withTM({
    reactStrictMode: true,
    expiremental: {
        esmExternals: 'loose'
    }
}
)