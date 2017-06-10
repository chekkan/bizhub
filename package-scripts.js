module.exports = {
    scripts: {
        default: 'nps webpack',
        webpack: {
            default: 'nps webpack.server',
            server: {
                default: `webpack-dev-server -d --devtool '#source-map' --inline --env.server`
            }
        }
    }
}
