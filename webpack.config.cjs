const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
    //entry point of app
    entry: './src/client/index.tsx',
    output: {
        filename: 'bundle.js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', ['@babel/preset-typescript', { isTSX: true, allExtensions: true }]], // Use the presets
                      },
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(png|jpg|gif|jpeg|svg)$/i,
               type: 'asset/resource',
            }
        ]
    },
   
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: './src/client/index.html',
        })
    ],

    devServer: {
        //match the output path,
        static: {
            directory: path.resolve(__dirname, 'dist'),
            publicPath: '/dist',
        },
        historyApiFallback: true,
        port: 8080,
        proxy: [
            {
                context: ['/'],
                target: 'http://localhost:3000',
                changeOrigin: true,
            }
        ]
    },
    resolve: {
        // Enable importing JS / JSX files without specifying their extension
        extensions: ['.js', '.jsx', '.tsx', '.ts']
    }
};
