{
  module: {
    rules: [
      // ⬇️ Add this:
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' }
      }
    ]
  },
  // ...
  output: {
    // ...
    globalObject: 'this', // ⬅️ And this
  }
}