module.exports = {
  resolve: {
    extensions: ['.js', '.css'],
    fallback: {
      path: false,
      fs: false,
      util: false,
      assert: false,
      stream: false,
      constants: false
    }
  },
  target: 'electron-renderer',
  module: {
    rules: require('./rules.webpack')
  }
}
