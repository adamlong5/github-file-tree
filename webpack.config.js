var webpack = require('webpack');
module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['latest'],
          plugins: ['transform-object-assign'],
        },
      },
    ],
  },
  output: {
    filename: './extension/script.js',
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   mangle: true,
    //   sourcemap: false,
    //   compress: {
    //     warnings: false,
    //   }
    // }),
    // new webpack.optimize.AggressiveMergingPlugin() // Merge chunks
  ],
};
