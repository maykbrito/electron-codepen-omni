module.exports = {
  resolve: {
    extensions: ['.js']
  },
  entry: './src/main/app.js',
  module: {
    rules: require('./rules.webpack')
  }
}
