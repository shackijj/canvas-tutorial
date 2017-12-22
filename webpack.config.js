const ModernizrWebpackPlugin = require('modernizr-webpack-plugin');
const path = require('path');

const ModernizrConfig = {
    noChunk: true,
    'feature-detects': [
        'canvas'
    ]
};

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                },
            },
            {
                test: /Box2D.js$/,
                use: [ 'script-loader' ]
            },
            {
                test: /\.(png|jpg|gif|mp3|ogg|wav)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}  
                    }
                ]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new ModernizrWebpackPlugin(ModernizrConfig)
    ],
    devServer: {
        https: true,
        contentBase: [
            path.join(__dirname, "dist"),
            path.join(__dirname, "images"),
            path.join(__dirname, "audio"),
        ],
        proxy: {
            '/images/*': {
                target: 'https://localhost:9000',
                pathRewrite: { '^/images': ''}
            }
        },
        compress: true,
        port: 9000
    }
};