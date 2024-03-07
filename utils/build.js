var webpack = require('webpack'),
  path = require('path'),
  fs = require('fs'),
  config = require('../webpack.prod.cjs'),
  ZipPlugin = require('zip-webpack-plugin');


var packageInfo = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

config.plugins = (config.plugins || []).concat(
  new ZipPlugin({
    filename: `${packageInfo.name}-${packageInfo.version}.zip`,
    path: path.join(__dirname, '../', 'deploy'),
  })
);

webpack(config, function (err) {
  if (err) throw err;
});
