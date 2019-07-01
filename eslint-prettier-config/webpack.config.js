const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",

  entry: __dirname + "/index.jsx", //唯一入口文件
  output: {
    path: __dirname + "/dist/", //打包后的文件存放的地方
    filename: "js/[name]-[hash].js", //打包后输出文件的文件名
    chunkFilename: "js/[name]-[chunkhash].js",
    publicPath: "" //js文件引入目录
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },

  devServer: {
    contentBase: __dirname + "/dist", //本地服务器所加载的页面所在的目录
    compress: true,
    historyApiFallback: true, //不跳转
    host: "0.0.0.0", //本地地址
    port: 9191, //移动端 端口号
    inline: true, //打包后加入一个websocket客户端
    hot: true //热加载
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz|mp4|mp3)|(kv\.ts)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "images/[name]-[hash].[ext]",
            limit: 10000
          }
        },
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/index.html",
      inject: "body"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
