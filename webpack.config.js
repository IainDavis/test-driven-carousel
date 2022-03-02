// webpack.config.js
module.exports = {
  mode: 'development',
  output: {
    hashFunction: 'sha256',
  },
  entry: {
    carousel: './src/Carousel.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: require.resolve('babel-loader'),
      },
    ],
  },
};
