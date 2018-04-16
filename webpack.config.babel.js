import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

import SiteMap from './sitemap';
import showdownjsLoader from './webpack/showdownjs-loader';


function genConfig(env, options) {
    const NODE_ENV = (options.mode || process.env.NODE_ENV || 'production').trim(),
        isProd = NODE_ENV === 'production',
        isDev = !isProd;

    const webpackConfig = {
        entry: {
            index: './js/index.js',
        },

        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
        },

        resolveLoader: {
            alias: {
                // use custom loader because npm's showdown-loader uses showdown-ghost which has been deprecated in favor of
                // showdown
                'showdownjs-loader': path.join(__dirname, './webpack/showdownjs-loader')
            }
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.s[ca]ss$/,
                    exclude: /node_modules/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            { loader: 'css-loader' },
                            { loader: 'sass-loader' },
                        ]
                    }),
                },
                {
                    test: /\.png$/,
                    loader: 'file-loader',
                    options: {
                        name: '/img/[name].[ext]',
                    }
                },
                {
                    test: /\.md$/,
                    exclude: /node_modules/,
                    loader: [
                        { 
                            loader: 'html-loader'
                        },
                        'showdownjs-loader'
                    ]
                },
                {
                    test: /\.ejs$/,
                    exclude: /node_modules/,
                    loader: 'ejs-loader',
                }
            ]
        },

        plugins: [],

        externals: [
            { jquery: '$' },
            'hljs',
        ],
    };

    function addPlugins(plugins) {
        for (let plugin of plugins) {
            if (plugin) {
                webpackConfig.plugins.push(plugin);
            }
        }
    }

    function genHtmlWebpackPlugin(fileObj) {
        // let md = fs.readFileSync(path.join('./docs', fileObj.file)).toString();
        // md = showdownjsLoader(md);

        return new HtmlWebpackPlugin({
            template: '!!ejs-loader!./templates/main.ejs',
            filename: path.join(fileObj.path, 'index.html'),
            chunks: ['index'],
            inject: 'body',
            templateParameters: {
                md : fileObj.file,
                subtitle: fileObj.name
            },
            cache: true
        });
    }

    addPlugins([
        isProd && new CleanWebpackPlugin(['dist']),
        new webpack.ProvidePlugin({
            _: 'lodash',
        }),
        new ExtractTextPlugin({ 
            filename: '[name].css',
        }),
        new CopyWebpackPlugin([
            {
                from: './resources/favicon.png',
                flatten: true
            }
        ]),
        ...SiteMap.map(genHtmlWebpackPlugin),
    ]);

    return webpackConfig;
}

export default genConfig;