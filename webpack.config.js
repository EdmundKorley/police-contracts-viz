var webpack = require('webpack');

module.exports = {
  entry: './app/main.js',
  output: {
    filename: './public/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new webpack.ProvidePlugin({
     $: "jquery",
     jquery: "jquery",
     "windows.jQuery": "jquery"
    }),
  ]
};
