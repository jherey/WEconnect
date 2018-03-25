const path = require('path');

module.exports = {
  entry: {
    index: './client/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.bundle.js'
  }
};
