const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv').config({
    path: './.env',
});
const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    plugins: [
        isDevelopment && new ReactRefreshWebpackPlugin(),
        isDevelopment && new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.parsed),
        }),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, '/public/index.html'),
        }),
    ].filter(Boolean),
    module: {
        rules: [

            {
                test: /\.(t|j)s(x)?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
                            plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
                        },
                    },
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack', 'url-loader'],
            },
        ]
    },
    entry: path.resolve(__dirname, '/src/index.tsx'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            components: path.resolve(__dirname, 'src/components/'),
            template: path.resolve(__dirname, 'src/template/'),
            providers: path.resolve(__dirname, 'src/providers/'),
            routes: path.resolve(__dirname, 'src/routes/'),
            pages: path.resolve(__dirname, 'src/pages/'),
            themes: path.resolve(__dirname, 'src/themes/'),
            types: path.resolve(__dirname, 'src/types/'),
            utils: path.resolve(__dirname, 'src/utils/'),
            services: path.resolve(__dirname, 'src/services/'),
            contexts: path.resolve(__dirname, 'src/contexts/'),
            hooks: path.resolve(__dirname, 'src/hooks/')
        },
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, '/public'),
        },
        historyApiFallback: true,
        port: 3000,
        hot: true,
        open: true
    },
    externals: {

    }
};
