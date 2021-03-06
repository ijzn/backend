const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const webpack = require('webpack')

let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js',
    publicPath: WEBPACK_ENV === 'dev' 
    ? '/dist/' : '//s.jianliwu.com/admin-v2-fe/dist/',
  },
  devServer: {
    //  contentBase: './dist',
    port: 8085,
    historyApiFallback: {
      index: '/dist/index.html'
    },
    proxy: {
      '/manage/*' : {
        target: 'http://admintest.happymmall.com',
        changeOrigin: true,
      },
      '/user/logout.do' : {
        target: 'http://admintest.happymmall.com',
        changeOrigin: true,
      }
    }
  },
  resolve: {
    alias: {
      pages: path.resolve(__dirname, '../src/pages'),
      components: path.resolve(__dirname, '../src/components'),
      util: path.resolve(__dirname, '../src/util'),
      api: path.resolve(__dirname, '../src/api')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env','react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'              
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 处理html文件
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      favicon: path.join(__dirname, '../favicon.ico')
    }),
    // 独立css文件
    new ExtractTextPlugin("css/[name].css"),
    // 提取公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    })
  ]
};