import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components'),
      containers: path.resolve(__dirname, 'src/containers'),
    },
  },
  devtool: process.env.NODE_ENV === 'production' ? '' : 'eval',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules&url=false&localIdentName=[path][name]__[local]__[hash:base64:5]',
            'postcss-loader',
            'sass-loader',
          ],
        }),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      inject: 'body',
    }),
    new ExtractTextPlugin('styles.css'),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
