const path = require('path')
const webpack = require('webpack')
const MiniCssExtractorPlugin = require('mini-css-extract-plugin')


module.exports = {
  
  entry: './src/index.js',
  
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './image_storage/frontend/')
  },
  
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new MiniCssExtractorPlugin({
      filename: 'style.css'
    })
  ],
  
  module: {
    rules: [
      {
        test: /\.css/,
        use: [MiniCssExtractorPlugin.loader, "css-loader"],
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader'
        }, 
        {
          loader: 'css-loader'
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          }
        }, 
        {
          loader: 'sass-loader'
        }]
      }
    ]
  }
}