const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const jsArr = fs.readdirSync('./front/js');

for(var i = 0; i < jsArr.length; i++) {
    jsArr[i] = './front/js/' + jsArr[i];
}

module.exports = {
    mode: 'development',  //production
    entry: {
        app: jsArr,
    },
    output: {
        path: path.resolve(__dirname,'public'),
        filename: '[name].[chunkhash].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            }
        ]
    },
    /* plugins: [],
    optimization: {},
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js','.json','.jsx','.css'],
    }, */
};