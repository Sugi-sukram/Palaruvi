// webpack.config.js
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true, // Required for resolve-url-loader
            },
          },
          'resolve-url-loader',
        ],
      },
      // other rules...
    ],
  },
  // other configurations...
};
