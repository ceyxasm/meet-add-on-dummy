module.exports = {
  entry: './main.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    library: 'helloWorld',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  resolve: {
    extensions: ['.js']
  }
};