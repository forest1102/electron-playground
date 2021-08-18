import path from 'path';
import { Configuration } from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import base from './webpack.base';

const mainView: Configuration = {
  ...base,
  target: 'web',
  entry: {
    mainView: './src/renderer/mainView/renderer.tsx',
  },
  output: {
    ...base.output,
    path: path.resolve(__dirname, '../dist/renderer/mainView'),
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist/renderer/mainView'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 4000,
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/renderer/mainView/index.html',
      minify: true,
      inject: 'body',
      filename: 'index.html',
      scriptLoading: 'blocking',
    }),
    new MiniCssExtractPlugin(),
  ],
};

export default mainView;
