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
                use: [
                    { 
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            useRelativePath: true,
                            emitFile: false
                        }
                    }
                ]   
            },
            {
                test: /\.md$/,
                exclude: /node_modules/,
                loader: [
                    { 
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src']
                        }
                    },
                    'highlightjs-loader',
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
        { jquery: '$' }
    ],
};

function addPlugins(plugins) {
    for (let plugin of plugins) {
        webpackConfig.plugins.push(plugin);
    }
}

function genHtmlWebpackPlugin(md) {
    let filename = md;
    if (md.indexOf('-') !== -1) {
        filename = md.replace(/-/g, path.sep);
    }

    filename = filename.replace(/\.md$/, '.htm');

    return new HtmlWebpackPlugin({
        template: '!!ejs-loader!./templates/main.ejs',
        filename: filename,
        chunks: ['index'],
        inject: 'body',
        templateParameters: {
            showJumbotron: md === 'index.md',
            md
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
        {
            from: './img/*'
        }
    ]),
    ...fs.readdirSync(path.join(__dirname, 'docs')).filter(f => path.extname(f) === '.md').map(genHtmlWebpackPlugin),
]);

export default webpackConfig;