
var webpack = require('webpack')

module.exports = {
  mode: 'development',
  devServer: {
    inline: true,
    historyApiFallback: true,
    contentBase: process.cwd()+'/src',
    port: 8080
  },
  devtool: 'eval-source-map',
  entry: process.cwd()+'/src/app.js',
  output: {
    path: process.cwd()+'/dist',
    filename: 'js/app.js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader'
        }]
      }
    ]
  }
}
