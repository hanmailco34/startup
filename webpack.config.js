const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const { WebpackManifestPlugin  } = require('webpack-manifest-plugin');
const entry = fs.readdirSync('./front/js');
const entrys = {};

for(var i = 0; i < entry.length; i++) {
    entrys[entry[i].split('.')[0]] = './front/js/' + entry[i];
}

module.exports = {
    mode: 'development',  //production
    entry: entrys,
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
    plugins: [
        new WebpackManifestPlugin({
            map: f => {
                f.path = f.path.replace(/^auto/,'');
                return f;
            }
        })
    ]
    /* plugins: [],
    optimization: {},
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js','.json','.jsx','.css'],
    }, */
};