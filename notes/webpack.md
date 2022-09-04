
### webpack
#### module chunk bundle 概念
* module：各个源码文件 webpack中一切皆模块
* chunk：多模块合并成的 eg: entry import() splitChunk中的chunk
* bundle：最终输出文件


#### loader
* 执行顺序：从后往前
* 处理css：style-loader css-loader postcss-loader,其中postcss是为一些css 做了兼容性处理 eg: 使用transform 后变成-webkit-transform
* 处理图片：本地用file-loader 直接引入图片地址 线上处理用url-loader更复杂一些
```javascript
test: /\.(png|jpg|jpeg|gif)$/,
use: {
    loader: 'ulk-loader',
    options: {
        // 小于5kb 用base64格式产出 好处是减少了一次http请求img
        
        // 否则 依然沿用file-loader 产出url形式
        limit: 5 * 1024,
        // 打包到img目录下
        outputPath: '/img/',
        // 设置图片的cdn地址
        publicPath: 'xxx'
    }
}
```
#### 多入口
```javascript
const srcPath = require('./paths');
entry: {
    index: path.join(srcPath, 'index.js'),
    other: path.join(srcPath, 'other.js')
}

output: {
    filename: '[name][contentHash: 8].js',
    path: distPath
}

plugins: [
    new HtmlWebpackPlugin({
        template: path.join(srcPa
        th, 'index.html'),
        filename: 'index.html',
        // 表示该页面引用哪些chunk （即入口的文件）默认全引入
        chunks: ['index']
    }),
    new HtmlWebpackPlugin({
        template: path.join(srcPath, 'other.html'),
        filename: 'other.html',
        chunks: ['other']
    })
]
```

#### 生产环境 抽离css
```javascript
{
    test: /\.css$/,
    loader: [
        // 这里不再用style-loader 以<style>引入css了
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader'
    ]
}

plugins: [
    new MiniCssExtractPlugin({
        filename: 'css/main.[contentHash: 8].css'
    })
]

optimization: {
    // 压缩css
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPl
    ugin({})]
}
```

#### 生产环境 抽离公共代码块 第三方库 分包
```javascript
optimization: {
    // 定义chunk
    splitChunks: {
        // initial 入口chunk 对于异步导入文件不处理
        // async 异步chunk 只对异步导入的文件处理
        // all 全部chunk
        chunks: 'all',
        // 缓存分组
        cacheGroups: {
            // 第三方模块
            vendor: {
                name: 'vendor',// chunk名称
                priorityL: 1 // 权限更高 优先抽离 
                test: /node_modules/, // 命中node_modules 说明是第三方模块
                minSize: 0, // 大小限制
                minChunks: 1 // 最少复用过几次
            },
            // 公共模块
            common: {
                name: 'common',
                priority: 0,
                minSize: 0,
                minChunks: 2
            }
        }
    }
}

{
    new HtmlWebpackPlugin({
        template: path.join(srcPath, 'index.html'),
        filename: 'index.html',
        // 使用chunk
        chunks: ['index', 'vendor', 'common']
    }),
    new HtmlWebpackPlugin({
        template: path.join(srcPath, 'other.html'),
        filename: 'other.html',
        // 使用chunk
        chunks: ['other'
        , 'common']
    })
}
```

#### webpack性能优化
* 优化打包构建速度 - 开发体验和效率
    * 优化babel-loader: babel-loader 将es6 7转化成es5 还是需要一些时间的
    ```javacsript
    {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory'], // 开启缓存 未更改的内容直接命中缓存
        include: path,resolve(__dirname, 'src') // 明确范围 exclude排除范围
    }
    ```
    * IgnorePlugin：避免引入无用模块  直接不引入
    ```javascript
    // 格式化日期 时间 支持多语言 默认会引入所有语言js代码 代码过大
    import moment from 'moment'
    
    plugins: [
        // 忽略moment下的/locale目录
        new webpack.IgnorePlugin(/\.\/locale/, /moment/)
    ]
    
    // 再手动引入语言包
    import 'moment/locale/zh-cn'
    ```
    * noParse: 避免重复打包  引入 但不打包
    ```javascript
    module:{
        // 忽略对react.min.js 文件的递归解析处理
        noParse: [/react\.min\.js$/]
    }
    ```
    * happyPack：多进程打包
    ```javascript
    module: {
        rules: [
            {
                test: /\.js$/,
                // 把对.js文件的处理转交给id为babel的happypack实例
                use: ['happypack/loader?id=babel'],
                include: srcPath
            }
        ]
    },
    plugins: [
        new HappyPack({
            // 用唯一的标识符id 来代表当前的HappyPack 是用来处理一类特定的文件
            id: 'babel',
            // 如何处理,js文件 用法和laoder配置中一样
            loaders: ['babel-loader?cacheDirectory']
        })
    ]
    ```
    * ParalleUglifyPlugin: 多进程压缩js
    ```javascript
    plugins: [
        // 并行压缩输出的js代码
        new ParalleUglifyPlugin({
            // 传递给UglifyJS的参数 还是使用UglifyJS压缩 只不过帮忙开启了多进程
            uglifyJS: {
                output: {
                    beautify: false, // 最紧凑的输出
                    comments: false // 删除所有注释
                },
                compress: {
                    // 删除所有console 可以兼容ie
                    drop_console: true,
                    // 内嵌定义了但是只使用一次的变量
                    collapse_vars: true,
                    // 提取出现多次但没有定义成变量去引用的静态值
                    reduce_vars: true 
                }
            }
        })
    ]
    ```
    * 热更新
    ```javascript
    entry: {
        index: [
            'wenpack-dev-server/client?http://localhost:8080',
            'webpack/hot/dev-server',
            path.join(srcPath, 'index.js')
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true
    }
    ```
    * DllPlugin: 动态链接库   
    前端框架 eg：react vue体积较大，构建较慢，并且不常升级版本 比较稳定，所以不需要每次都构建 只需要同一个版本构建一次即可   
    webpack 内置DllPlugin支持   
    DllPlugin 打包输出dll文件
    DllReferencePlugin 使用dll文件
* 优化产出代码 - 产品性能 ：体积更小 合理分包 不重复加载 速度更快 内存使用更小
     * 小图片使用base64
     * bundle加hash
     * 懒加载
     * 提取公共代码
     * 使用CDN加速： 配置output/publicPath 将打包好的文件上传到cdn
     * 使用production：
        * webpack4之后 使用```mode = production```会自动压缩代码
        * vue react自动删除调试代码，eg：开发环境的warning
        * 启动Tree-Shaking（删除定义未使用的变量）注：只有使用ES6 Moduletree-shaking才能生效 commonJS不生效，原因：es6 module是静态引入 编译时引入 commonJS是动态引入 运行时引入 而webpack只是打包分析 这时候代码还没有运行 只有静态的才能生效
     * Scope Hosting：产生作用域更少 代码体积更小
    ```javascript
    resolve: {
        // 针对npm中第三方模块优先采用 jsnext：main中指向的es6模块化语法的文件
        mainFields: ['jsnext: main', 'brower', 'main']
    },
    plugins: [
        new ModuleConcatenationPlugin()
    ]
    ```
    
### babel
#### 特性：
* 将es6转为es5 
* 只关心语法 不关心API 
* 不处理模块化
#### babel-polyfill：
* polyfill类似补丁 做一些兼容 比如浏览器不支持indexof 就自定义一个indexof函数
* core-js和regenerator babel用这两个插件处理异步语法 eg: genarator
* babel-polyfill就是以上二者集合，但babel7.4以上官方推荐使用core-js和regenerator
* 按需引入：babel-polyfill体积较大 需要按需引入
```javascript
//babelrc
{
    "presets": [
        [
            "babel/presets-env",
            {
                "useBuiltIns": "usage" ,
                "corejs": 3
            }
        ]
    ]
}
```
* 存在的问题：
    * 污染全局环境 eg:解析promise 会 window.Promise === xxx
#### babel-runtime
* 解决了babel-polyfill 存在的问题 window._promise["default"] === xxx


#### 前端为什么要进行打包构建
* 代码体积更小（tree-shaking 压缩 合并）， 加载更快
* 编译高级语言或语法（ES6+ TS scss 模块化）
* 兼容性和错误检查（eslint polyfill postcss）
* 统一 高效的开发环境
* 统一构建流程和产出标准
* 集成公司构建规范

#### 为什么proxy 不能被polyfill？
* class功能可以用function 模拟
* Promise功能可以用callback模拟
* 但proxy功能 用Object.defintProperty无法模拟
