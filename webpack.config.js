const path = require("path");

module.exports = {
  entry: "./src/afvalbeheer-card.js",
  output: {
    filename: "afvalbeheer-card.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
};
