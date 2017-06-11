const { series, rimraf } = require("nps-utils") // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
    scripts: {
        default: "nps webpack",
        test: {
            default: "nps test.karma",
            karma: {
                default: series(
                    rimraf("test/coverage-karma"),
                    "karma start test/karma.conf.js"),
            },
        },
        webpack: {
            default: "nps webpack.server",
            server: {
                default: "webpack-dev-server -d --devtool '#source-map' --inline --env.server",
            },
        },
        lint: {
            default: "eslint src",
            fix: "eslint src --fix",
        },
    },
}
