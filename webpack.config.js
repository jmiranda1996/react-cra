const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = () => { 

    const env = dotenv.config().parsed;

    const envKeys = Object.keys(env || {}).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        devtool: 'source-map',
        entry: [
            './app/index.tsx'
        ],         
        output: {
            path: path.join(__dirname, 'build/'),
            publicPath: '/',
            filename: 'bundle.js',
        },
        devServer: {
            historyApiFallback: true
        },
        resolve: {
            modules: ['node_modules', 'app'],
            extensions: ['.js', '.jsx', '.react.js', '.ts', '.tsx'],
            alias: { }
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                  test: /\.svg$/,
                  use: ['@svgr/webpack'],
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                        },
                    ],
                },
                {
                    test: /\.tsx?$/,
                    use: {
                    loader: 'awesome-typescript-loader'
                    }
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    ],
                },
                {
                    test: /\.(png|jpe?g|svg|gif)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                        }
                    ],
                }
            ],
        },
        plugins: [
            new webpack.DefinePlugin(envKeys),
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebPackPlugin({
                template: './app/index.html',
            }),
        ],
    };
};