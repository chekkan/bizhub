const ExtractTextPlugin = require("extract-text-webpack-plugin") // eslint-disable-line import/no-extraneous-dependencies
const autoprefixer = require("autoprefixer") // eslint-disable-line import/no-extraneous-dependencies

const cssRules = [
  { loader: "css-loader" },
    {
        loader: "postcss-loader",
        options: {
            plugins: () => [autoprefixer({ browsers: ["last 2 versions"] })],
        },
    },
]

module.exports = extractCss => [
  // CSS required in JS/TS files should use the style-loader that auto-injects
  // it into the website
  // only when the issuer is a .js/.ts file, so the loaders are not applied
  // inside html templates
    {
        test: /\.css$/i,
        issuer: [{ not: [{ test: /\.html$/i }] }],
        use: extractCss
      ? ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: cssRules,
      })
      : ["style-loader", ...cssRules],
    },
    {
        test: /\.css$/i,
        issuer: [{ test: /\.html$/i }],
    // CSS required in templates cannot be extracted safely
    // because Aurelia would try to require it again in runtime
        use: cssRules,
    },
]
