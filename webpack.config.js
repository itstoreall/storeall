// const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

console.log('is dev', isDev);

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimizer = [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

const filename = ext => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        // hmr: isDev,
        // reloadAll: true,
      },
    },
    'css-loader',
  ];

  if (extra) {
    loaders.push(extra); // for sass or less loaders
  }

  return loaders;
};

const babelOptions = preset => {
  const options = {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-proposal-class-properties'],
  };

  options.presets.push(preset);

  return options;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.js'],
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },

  optimization: optimization(),

  devServer: {
    port: 8822,
    hot: isDev,
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      minify: {
        collapseWhitespace: isProd,
      },
      // favicon: '../public/favicon.ico',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
        {
          from: path.resolve(__dirname, 'public/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
        {
          from: path.resolve(__dirname, 'public/manifest.json'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
  ],

  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   use: ['babel-loader'],
      // },
      {
        test: /\.(m?js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-typescript'),
        },
      },
      {
        test: /\.(jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react'),
        },
      },
      {
        test: /\.css$/, // $/i
        exclude: /node_modules/,
        use: cssLoaders(),
      },
      {
        test: /\.(png|jpe?g|svg)$/, // $/i
        use: ['file-loader'],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader'],
      },
    ],
  },

  resolve: {
    extensions: [
      '*',
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.json',
      '.css',
      '.svg',
      '.png',
    ],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@img': path.resolve(__dirname, 'src/img'),
    },
  },
};
