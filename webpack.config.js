const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
let env = (process.env.NODE_ENV === 'production') ? 'production' : 'development'

const configureCleanWebpack = () => {
  return [
    path.resolve(__dirname, 'server/public/dist')
  ]
}

const configureCopyWebpack = () => {
  return [
   {      
      from: path.resolve(__dirname, 'theme/include'),
      to: '../'
    }
  ]
}

const configureMiniCssExtract = () => {
  return { filename: 'css/[name].css', chunkFilename: 'css/[id].css' }
}

module.exports = {
  mode: env,

  entry: {
    main: './theme/src/index.js'
  },

  output: {
    filename: './js/[name].js',
    path: path.resolve(__dirname, 'server/public/dist')
  },

  resolve: {
    symlinks: false,
  },

  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin(configureCopyWebpack()),
    new CleanWebpackPlugin(configureCleanWebpack()),
    new MiniCssExtractPlugin(configureMiniCssExtract())
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|pcss)$/,

        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/dist/'
            }
          }, {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
}