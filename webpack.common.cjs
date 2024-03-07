const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DotenvPlugin = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");
const baseManifest = require("./static/manifest.json");

var fileExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'eot',
  'otf',
  'svg',
  'ttf',
  'woff',
  'woff2',
];

module.exports = {
  entry: {
    background: './src/scripts/background.ts',
    content: './src/scripts/content.ts',
    'popup-inject': './src/scripts/popup.ts',
    'options-inject': './src/scripts/options.ts',
    popup: path.join(__dirname, 'src', 'app', 'popup', 'index.tsx'),
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: fileExtensions
      .map((extension) => '.' + extension)
      .concat(['.js', '.jsx', '.ts', '.tsx', '.css']),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: './src/app/popup/index.html',
      chunks: ['popup'],
      hash: true
    }),
    new HtmlWebpackPlugin({
      filename: 'options.html',
      template: './src/app/popup/index.html',
      chunks: ['options'],
      hash: true
    }),
    new DotenvPlugin(),
    new ESLintPlugin({
      extensions: ['js', 'ts'],
      overrideConfigFile: path.resolve(__dirname, '.eslintrc'),
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
    }),
    new CopyPlugin({
      patterns: [{ from: 'static/icons', to: 'icons' }],
    }),
    new WebpackExtensionManifestPlugin({
      config: {
        base: baseManifest
      },
      minify: true,
    })
  ],
};
