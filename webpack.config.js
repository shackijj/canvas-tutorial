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
                }
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new ModernizrWebpackPlugin(ModernizrConfig)
    ]
};