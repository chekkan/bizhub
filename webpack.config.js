const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const { AureliaPlugin } = require("aurelia-webpack-plugin")
const { optimize: { CommonsChunkPlugin }, ProvidePlugin } = require("webpack")

const configSass = require("./webpack/config-sass")
const configCss = require("./webpack/config-css")

// config helpers:
const ensureArray = config =>
  (config && (Array.isArray(config) ? config : [config])) || []
const when = (condition, config, negativeConfig) =>
  (condition ? ensureArray(config) : ensureArray(negativeConfig))

// primary config:
const title = "Busy Nest"
const outDir = path.resolve(__dirname, "dist")
const srcDir = path.resolve(__dirname, "src")
const nodeModulesDir = path.resolve(__dirname, "node_modules")
const baseUrl = "/"

module.exports = ({ production, server, extractCss, coverage } = {}) => ({
    resolve: {
        extensions: [".js"],
        modules: [srcDir, "node_modules"],
    },
    entry: {
        app: ["aurelia-bootstrapper", `${srcDir}/scss/main.scss`],
        vender: ["bluebird", "jquery", "popper.js", "bootstrap"],
    },
    output: {
        path: outDir,
        publicPath: baseUrl,
        filename: production
      ? "[name].[chunkhash].bundle.js"
      : "[name].[hash].bundle.js",
        sourceMapFilename: production
      ? "[name].[chunkhash].bundle.map"
      : "[name].[hash].bundle.map",
        chunkFilename: production
      ? "[name].[chunkhash].chunk.js"
      : "[name].[hash].chunk.js",
    },
    devServer: {
        contentBase: outDir,
    // serve index.html for all 404 (required for push-state)
        historyApiFallback: true,
    },
    module: {
        rules: [
            ...configCss(extractCss),
            ...configSass(extractCss),
      { test: /\.html$/i, loader: "html-loader" },
            {
                test: /\.js$/i,
                loader: "babel-loader",
                exclude: nodeModulesDir,
                options: coverage ? { sourceMap: "inline", plugins: ["istanbul"] } : {},
            },
      { test: /\.json$/i, loader: "json-loader" },
      // use Bluebird as the global Promise implementation:
            {
                test: /[/\\]node_modules[/\\]bluebird[/\\].+\.js$/,
                loader: "expose-loader?Promise",
            },
      // exposes jQuery globally as $ and as jQuery:
            {
                test: require.resolve("jquery"),
                loader: "expose-loader?$!expose-loader?jQuery",
            },
      // embed small images and fonts as Data Urls and larger ones as files:
            {
                test: /\.(png|gif|jpg|cur)$/i,
                loader: "url-loader",
                options: { limit: 8192 },
            },
            {
                test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                loader: "url-loader",
                options: { limit: 10000, mimetype: "application/font-woff2" },
            },
            {
                test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                loader: "url-loader",
                options: { limit: 10000, mimetype: "application/font-woff" },
            },
      // load these fonts normally, as files:
            {
                test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                loader: "file-loader",
            },
        ],
    },
    plugins: [
        new AureliaPlugin(),
        new ProvidePlugin({
            Promise: "bluebird",
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Popper: ["popper.js", "default"],
        }),
        new HtmlWebpackPlugin({
            template: "index.ejs",
            minify: production
        ? {
            removeComments: true,
            collapseWhitespace: true,
        }
        : undefined,
            metadata: {
        // available in index.ejs
                title,
                server,
                baseUrl,
            },
        }),
        new CopyWebpackPlugin([
            { from: "favicon.ico", to: "favicon.ico" },
            { from: "config/config.json", to: "config/config.json" },
            { from: "node_modules/font-awesome/fonts", to: "fonts" }]),
        ...when(
      extractCss,
      new ExtractTextPlugin({
          filename: production ? "[contenthash].css" : "[id].css",
          allChunks: true,
      })),
        ...when(
      production,
      new CommonsChunkPlugin({
          name: "common",
      })),
    ],
})
