const path = require('path');
const fs = require('fs');
const { WebpackManifestPlugin  } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const entry = fs.readdirSync('./front/js');
const entrys = {};
const htmlEntry = fs.readdirSync('./front/html');
const htmlEntrys = [];
htmlEntry.forEach(e=>{
    htmlEntrys.push(
        new HtmlWebPackPlugin({
            hash:true,
            template:'./front/html/' + e,
            filename: '../html/' + e,
            inject: false
        })
    )
})

for(var i = 0; i < entry.length; i++) {
    entrys[entry[i].split('.')[0]] = './front/js/' + entry[i];
}

module.exports = {
    mode: 'development',  //production
    entry: entrys,
    output: {
        path: path.resolve(__dirname,'public','js'),
        publicPath: '/js/',
        filename: '[name].[chunkhash].js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.html$/,
                use : [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true,
                        }
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(__dirname,'public')]
        }),
        new WebpackManifestPlugin({
            map: f => {
                f.name = f.name.split('.')[0];
                f.path = f.path.replace(/^auto/,'');
                return f;
            }
        }),
        new MiniCssExtractPlugin({
            filename: "../css/[name].[contenthash].css",
            chunkFilename: "../css/[name].[contenthash].css"
        }),
    ].concat(htmlEntrys),
    /* 
    optimization: {},
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js','.json','.jsx','.css'],
    }, 
    */
};