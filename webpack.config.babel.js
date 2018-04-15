import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

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
                        loader: 'html-loader',
                        // options: {
                        //     attrs: ['img:src']
                        // }
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
        webpackConfig.plugins.push(plugin);
    }
}

function genHtmlWebpackPlugin(md) {
    let isIndex = md === 'index.md',
        filename = md;
    if (md.indexOf('-') !== -1) {
        filename = md.replace(/-/g, path.sep);
    }

    filename = filename.replace(/\.md$/, '.htm');
    let subtitle = '';
    if (!isIndex) {
        subtitle = path.basename(filename, '.htm');
        subtitle = subtitle.charAt(0).toUpperCase() + subtitle.substr(1);
    }

    return new HtmlWebpackPlugin({
        template: '!!ejs-loader!./templates/main.ejs',
        filename: filename,
        chunks: ['index'],
        inject: 'body',
        templateParameters: {
            md,
            subtitle
        },
        cache: true
    });
}

addPlugins([
    new webpack.ProvidePlugin({
        _: 'lodash',
    }),
    new ExtractTextPlugin({ 
        filename: '[name].css',
    }),
    new CopyWebpackPlugin([
        // {
        //     from: './resources/img/*',
        //     to: 'img',
        //     flatten: true,
        // },
        {
            from: './resources/favicon.png',
            flatten: true
        }
    ]),
    ...fs.readdirSync(path.join(__dirname, 'docs')).filter(f => path.extname(f) === '.md').map(genHtmlWebpackPlugin),
]);

export default webpackConfig;