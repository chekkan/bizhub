const sassRules = [
    { loader: "css-loader" },
    {
        loader: "sass-loader",
        options: {
            sourceMap: true,
        },
    },
]

module.exports = () => [
    {
        test: /\.scss$/,
        use: ["style-loader", ...sassRules],
    },
]
