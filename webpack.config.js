const path = require('path');//node自带，管理路径
const HtmlWebpackPlugin  = require('html-webpack-plugin');//对html代码处理
const uglify = require('uglifyjs-webpack-plugin');//对js代码压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//分离css
const PuriffyCssPlugin = require('purifycss-webpack');//去除冗余的css
const glob = require('glob');//node自带，用来筛选文件
module.exports = {
    // 入口
    entry: {
        a: './js/a.js',
        b: './js/b.js',
        c: './js/c.js'
    },
    // 出口
    output: {
        filename: 'js/[name].bundle.js',
        path: path.join(__dirname, './dist'),
    },
    module: {
        rules: [
            // 处理css
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,//分离css
                    'css-loader',
                    {
                        loader: 'postcss-loader'//给css添加前缀
                    }
                ]
                
            },
            // 处理css中img
            {
                test: /\.(png|jpg|gif|jpeg|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        outputPath: 'img/',//路径（相对于出口）
                        publicPath: '../img',
                        limit: 500,
                        name: '[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            },
            {
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["env"]
                    },
                },
                // include:path.join(__dirname,'../'),
                // exclude:/node_modules/
                exclude:path.resolve(__dirname,"node_modules"),
                include:path.resolve(__dirname,"../")
            }
        ]
    },
    plugins: [
        // 对js进行压缩
        new uglify(),
        // 分离css
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        // 打包html文件
        new HtmlWebpackPlugin({
            title: 'aaaa',// html文件title
            favicon: './img/icon.png',//配置文件faviccon
            filename: './a.html',//路径（相对于出口）+文件名
            template: 'a.html',//模板
            chunks: ['a'],//js文件,对应entry,
            minify: {//html代码处理
                removeComments: true,//去注释
                collapseWhitespace: true,//去空格
            },
            hash: true
        }),
        // 打包html文件
        new HtmlWebpackPlugin({
            title: 'bbb',
            filename: './b.html',//路径+文件名
            template: 'b.html',//模板
            chunks: ['b']//js文件
        }),
        // 打包html文件
        new HtmlWebpackPlugin({
            filename: './c.html',//路径+文件名
            template: 'c.html',//模板
            chunks: ['c']//js文件
        }),
        // 去除未用到的css
        new PuriffyCssPlugin({
            paths: glob.sync(path.join(__dirname, './*.html'))
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        host: 'localhost',
        compress: true,
        port: 5000,
        open: true
    }
}