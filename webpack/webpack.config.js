const MiniCssExtractPlugin = require('MiniCssExtractPlugin');
const webpack = require('webpack')

module.exports = {
    // 入口文件
    entry: {
        home: './home.js',
        about: './about.js',
        other: './other.js'
    },
    // 出口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js' // name就是各个入口文件
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'), // dist 是出口文件名 出口文件名是啥 这里的dist就是啥
        compress: true, // 缓存
        port: 8080 //端口
    },
    // 当前模式
    mode: 'development',
    plugins: [
        // 将css提取为单独文件的插件，对每个包含css的js文件都会创建一个css文件，支持按需加载css和sourceMap
        new MiniCssExtractPlugin({
            filename: '[name].css', // 生成出来的文件名为[name].css name就是对应入口文件的name
            chunkFilename: '[id].css' //未列在entry中但有些时候需要打包出来的文件，比如按需加载异步模块时，这样的文件是没有列在entry中的使用CommonJS等方式异步加载的模块
        }),
        //在编译阶段根据NODE_ENV自动切换配置文件，在编译时可以创建全局变量
        new webpack.DefinePlugin({
            'SERVICE_URL': JSON.stringify('http://www.sina.com') // 项目中所有用到该地址的地方都可以使用SERVICE_UR代替，方便代码维护
        })
    ],
    module: {
        rules: [{
                test: /\.(png|jpg|gif)$/i,
                use: [{
                    loader: 'url-loader', // 符合test规则的使用url-loader 
                    options: {
                        limit: 8192, // 图片允许范围8k 大于8k打包后以原图片形式存在 小于8k 以base64形式打包在js文件中
                    }
                }]
            },
            {
                test: /\.(m?js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader', // js和jsx文件 用babel-loader
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-react-jsx']
                    }
                }
            },
            {
                test: /\.(scss|less)$/,
                use: [
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
}