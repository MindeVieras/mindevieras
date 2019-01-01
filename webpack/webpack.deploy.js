
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
var S3Plugin = require('webpack-s3-plugin')
var fs = require('fs')

var s3DeployConfig = {}

if (fs.existsSync(path.resolve(__dirname, 's3-deploy-config.json'))) {
  var s3DeployConfig = require('./s3-deploy-config.json')
}
else {
  console.log('To start deploying app to S3 please create s3-deploy-config.json file.')
}

module.exports = {
  mode: 'production',
  entry: process.cwd()+'/src/js/main.js',
  output: {
    path: process.cwd()+'/dist',
    filename: 'scripts.min.js'
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
          loader: 'file-loader',
          options: {
            outputPath: 'images',
            name: '[name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: process.cwd()+'/src/index.html',
      inject: false,
      minify: {
        collapseWhitespace: true
      }
    }),
    new CopyWebpackPlugin([
      {
        from: process.cwd()+'/src/favicons/**/*',
        to: process.cwd()+'/dist/favicons/',
        flatten: true
      }
    ]),
    new S3Plugin({
      s3Options: {
        region: s3DeployConfig.region,
        accessKeyId: s3DeployConfig.accessKeyId,
        secretAccessKey: s3DeployConfig.secretAccessKey
      },
      s3UploadOptions: {
        Bucket: s3DeployConfig.bucket,
        CacheControl(fileName) {
          if (/\.png/.test(fileName)) {
            return 'max-age=172800'
          }
          else if (/\.js/.test(fileName)) {
            return 'max-age=172800'
          }
        }
      }
    })
  ]
}
