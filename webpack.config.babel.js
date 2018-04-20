import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

import SiteMap from './sitemap';
import MarkdownItBootstrap from './webpack/markdown-it-bootstrap';
import MarkdownItTwitchEmote from './webpack/markdown-it-twitch-emote';

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
                    test: /\.svg$/,
                    loader: 'svg-inline-loader',
                },
                {
                    test: /\.md$/,
                    exclude: /node_modules/,
                    use: [
                        'html-loader',
                        {
                            loader: 'markdownit-loader',
                            options: {
                                html: true,
                                use: [ 
                                    'markdown-it-named-headers', 
                                    MarkdownItBootstrap,
                                    MarkdownItTwitchEmote
                                ]
                            }
                        },
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
            },
            {
                from: './resources/CNAME',
                flatten: true,
            }
        ]),
        ...SiteMap.map(genHtmlWebpackPlugin),
    ]);
    
    return webpackConfig;
}

export default genConfig;