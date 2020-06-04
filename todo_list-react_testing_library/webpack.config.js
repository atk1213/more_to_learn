const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, "client/src/index.js"),
  output: {
    path: path.resolve(__dirname, "client/dist"),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'client/dist'),
    compress: true,
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.js[x]?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
}