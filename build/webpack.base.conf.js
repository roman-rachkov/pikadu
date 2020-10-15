const path = require("path");
const fs = require('fs');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
}

// Pages const for HtmlWebpackPlugin
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#html-dir-folder
// const PAGES_DIR = PATHS.src;
const PAGES_DIR = `${PATHS.src}/pug/pages/`;
const PAGES = fs
    .readdirSync(PAGES_DIR)
    .filter(fileName => fileName.endsWith(".pug"));

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        app: PATHS.src,
    },
    output: {
        filename: `${PATHS.assets}js/[name].[chunkhash].js`,
        path: PATHS.dist,
        publicPath: "/"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: "all",
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: '/node_modules'
            }, {
                test: /\.pug$/,
                loader: "pug-loader",
            }, {
                test: /\.(png|svg|gif|jpg)$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]'
                }
            }, {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]'
                }
            }, {
                test: /\.scss/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: {
                                path: `./build/postcss.config.js`
                            }
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }, {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: {
                                path: `./build/postcss.config.js`
                            }
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }

        ],
    },
    resolve: {
        alias: {
            '~': 'src',
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.$": "jquery",
            "window.jQuery": "jquery"
        }),
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[contenthash].css`,
            // chunkFilename: "[id].css"
        }),
        // new HtmlWebpackPlugin({
        //     // hash: false,
        //     template: `${PATHS.src}/index.html`,
        //     filename: "./index.html",
        //     // inject: false
        // }),
        new CopyWebpackPlugin([{
            from: `${PATHS.src}/${PATHS.assets}img`,
            to: `${PATHS.assets}img`,
        }, {
            from: `${PATHS.src}/${PATHS.assets}fonts`,
            to: `${PATHS.assets}fonts`,
        }, {
            from: `${PATHS.src}/static`,
            to: ''
        }]),
        /*
          Automatic creation any html pages (Don't forget to RERUN dev server!)
          See more:
          https://github.com/vedees/webpack-template/blob/master/README.md#create-another-html-files
          Best way to create pages:
          https://github.com/vedees/webpack-template/blob/master/README.md#third-method-best
        */
        ...PAGES.map(
            page =>
                new HtmlWebpackPlugin({
                    template: `${PAGES_DIR}/${page}`,
                    filename: `./${page.replace(/\.pug/, '.html')}`
                })
        )
    ]
}