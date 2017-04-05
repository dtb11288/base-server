const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { prop, append, evolve, pipe, assoc, assocPath } = require('ramda')

const baseConfig = {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        'plugins': ['transform-flow-strip-types'],
        'presets': ['es2015', 'stage-0', 'react']
      }
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      })
    }, {
      test: /\.json$/,
      exclude: /node_modules/,
      loader: 'json-loader'
    }, {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      exclude: /node_modules/,
      loader: 'url-loader?limit=100000'
    }]
  },
  resolve: {
    modules: [__dirname, 'node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
      compress: { warnings: false }
    })
  ]
}

const config = target => pipe(
  assoc('entry', target === 'node'
    ? path.join(__dirname, 'src', 'server.jsx')
    : path.join(__dirname, 'src', 'client.jsx')
  ),
  assocPath(['output', 'libraryTarget'], target === 'node'
    ? 'commonjs2'
    : 'var'
  ),
  assocPath(['output', 'path'], target === 'node'
    ? path.join(__dirname, 'build')
    : path.join(__dirname, 'build', 'public')
  ),
  assocPath(['output', 'filename'], target === 'node'
    ? 'app.js'
    : 'bundle.js'
  ),
  assoc('target', target),
  assoc('externals', target === 'node'
    ? [nodeExternals()]
    : []
  ),
  evolve({
    plugins: pipe(prop('plugins'), append(new ExtractTextPlugin({
      filename: target === 'node' ? 'public/bundle.css' : 'bundle.css',
      allChunks: true
    })))
  })
)(baseConfig)

module.exports = [config('node'), config('web')]
