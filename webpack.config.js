//webpack analyzer
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require('path');
const webpack = require("webpack");

module.exports = {
    entry: {
        app: './assets/js/script.js',
        events: './assets/js/events.js',
        schedule: './assets/js/schedule.js',
        tickets: './assets/js/tickets.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static", //the report otuputs to an HTML file in the dist folder
        })
    ],
    mode: 'development'
};
