const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './src/server.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  output: {
    filename: 'server.dist.js',
    path: path.resolve(__dirname)
  },
  externals: [
    nodeExternals()
  ]
}
