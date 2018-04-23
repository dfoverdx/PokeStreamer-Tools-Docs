import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

import SiteMap from './sitemap';
import MarkdownItBootstrap from './webpack/markdown-it/markdown-it-bootstrap';
import MarkdownItTwitchEmote from './webpack/markdown-it/markdown-it-twitch-emote';
import HLJSJsonc from './webpack/hljs-jsonc';
import HLJSDos from 'highlight.js/lib/languages/dos';
import HLJSLua from 'highlight.js/lib/languages/lua';

export default function genConfig(env, options) {
    const NODE_ENV = (options.mode || process.env.NODE_ENV || 'production').trim(),
    isProd = NODE_ENV === 'production',
    isDev = !isProd;
    
    const webpackConfig = {
        entry: {
            index: './js/index.js',
            main: './js/main.js',
        },
        
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, isDev ? 'dev-dist' : 'dist'),
        },

        optimization: {
            minimize: isProd,
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
                            { 
                                loader: 'css-loader',
                                options: {
                                    minimize: isProd,
                                }
                            },
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
                        'underscore-template-loader',
                        {
                            loader: 'markdownit-loader',
                            options: {
                                html: true,
                                use: [ 
                                    'markdown-it-named-headers',
                                    MarkdownItBootstrap,
                                    MarkdownItTwitchEmote
                                ],
                                highlightLanguages: {
                                    dos: HLJSDos,
                                    lua: HLJSLua,
                                    jsonc: HLJSJsonc,
                                }
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
        let SUB_TITLE = fileObj.subtitle || fileObj.name,
            PAGE_TITLE = `${fileObj.name} | Pokémon Soul.Link`;

        return new HtmlWebpackPlugin({
            template: '!!ejs-loader!./templates/main.ejs',
            filename: path.join(fileObj.path, 'index.html'),
            chunks: ['main'],
            inject: 'body',
            templateParameters: {
                MD: fileObj.file,
                PATH: fileObj.path,
                SUB_TITLE,
                PAGE_TITLE
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
                from: './static/favicon.png',
                flatten: true
            },
            {
                from: './static/CNAME',
                flatten: true,
            }
        ]),
        new HtmlWebpackPlugin({
            template: '!!ejs-loader!./templates/index.ejs',
            filename: 'index.html',
            chunks: ['index'],
            inject: 'body',
            cache: true
        }),
        ...SiteMap.map(genHtmlWebpackPlugin),
    ]);
    
    return webpackConfig;
}