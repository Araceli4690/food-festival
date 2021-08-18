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
    module: {
        rules: [
            {
                //identifying files to pre-process using regex, in this case any images
                test: /\.jpg$/i,
                use: [{
                    //webpack file-loader being implemented
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        //return name of file with file extension
                        name(file) {
                            return "[path][name].[ext]"
                        },
                        //changes assigment url
                        publicPath: function (url) {
                            return url.replace("../", "/assets")
                        }
                    }
                },
                {
                    //image loader reduces image size
                    loader: 'image-webpack-loader'
                }
                ]
            }
        ]
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
