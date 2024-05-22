const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

module.exports = {
  entry: {
    background: './extension/background.js',
    connect: './extension/connect.js',
    content: './extension/content.js',
    injected: './extension/injected.js',
    credentials: './extension/credentials.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "zlib": require.resolve("browserify-zlib")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'extension/connect.html', to: 'connect.html' },
        { from: 'extension/credentials.html', to: 'credentials.html' },
        { from: 'extension/manifest.json', to: 'manifest.json' },
        { from: 'extension/icons', to: 'icons' },
        { from: 'extension/tailwind.css', to: 'tailwind.css' }
      ],
    }),
    new WebpackShellPluginNext({
      onBuildStart:{
        scripts: ['npx tailwindcss -i ./extension/styles.css -o ./extension/tailwind.css'],
        blocking: true,
        parallel: false
      }
    })
  ]
};
