const path = require("path");
const webpack = require("webpack");
const themeName = "theme";
const MiniCssExtract = require("mini-css-extract-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');
const BrowserSync = require('browser-sync-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: {
        vendor: [
            `./wp-content/themes/${themeName}/assets/style/src/vendor.scss`,
            `./wp-content/themes/${themeName}/assets/js/src/vendor.js`
        ],
        main: [
            `./wp-content/themes/${themeName}/assets/style/src/main.scss`,
            `./wp-content/themes/${themeName}/assets/js/src/main.js`
        ]
    },
    output: {
        path: path.resolve(__dirname, `wp-content/themes/${themeName}/assets/js/dist/`),
        filename: "[name].js"
    },
    mode: "development",
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.s?css$/,
            use: [MiniCssExtract.loader, 'css-loader', 'sass-loader']
        }]
    },
    plugins: [
        new MiniCssExtract({ filename: `../../style/dist/[name].css` }),
        new BrowserSync({
            files: `./wp-content/themes/${themeName}/**`,
            proxy: `http://localhost/${themeName}`,
            port: 5000
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                include: [
                    `./wp-content/themes/${themeName}/assets/js/main.js`
                ]
            }),
            new OptimizeCSSAssets()
        ]
    }
};