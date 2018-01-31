import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components'),
    },
  },
  devtool: process.env.NODE_ENV === 'production' ? '' : 'eval',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules&url=false&localIdentName=[path][name]__[local]__[hash:base64:5]',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      inject: 'body',
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
