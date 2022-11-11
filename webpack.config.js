// const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: { main: './index.js' },
  output: {
    filename: production ? '[name].[contenthash].js' : '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new webpack.HotModuleReplacementPlugin(), // this .. or devServer: {hot: true}
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      // template: './public/index.html',
      // favicon: './public/favicon.ico',
    }),
    new MiniCssExtractPlugin({
      filename: production ? '[name].[contenthash].css' : '[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/, // $/i
        exclude: /node_modules/,
        use: [
          production ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              // modules: true, // no styless!!
              sourceMap: !production,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg)$/, // $/i
        use: ['file-loader'],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader'],
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
      //   type: 'asset',
      // },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', 'css', 'svg'],
  },
  devServer: {
    port: 8822,
    hot: true,
  },
  mode: production ? 'production' : 'development',
};
