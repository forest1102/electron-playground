import path from 'path';

import { Configuration } from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const isDev = process.env.NODE_ENV === 'development';

import base from './.config/webpack.base';

const copy = new CopyPlugin({
  patterns: [{ from: 'src/images', to: './images' }],
});

const main: Configuration = {
  ...base,
  target: 'electron-main',
  entry: {
    main: './src/main/main.ts',
  },
  output: {
    ...base.output,
    path: path.resolve(__dirname, 'dist/main'),
  },
  plugins: [copy],
};

const preload: Configuration = {
  ...base,
  target: 'electron-preload',
  entry: {
    preload: './src/main/preload.ts',
  },
  output: {
    ...base.output,
    path: path.resolve(__dirname, 'dist/main'),
  },
};

const mainView: Configuration = {
  ...base,
  target: 'web',
  entry: {
    mainView: './src/renderer/mainView/renderer.tsx',
  },
  output: {
    ...base.output,
    path: path.resolve(__dirname, 'dist/renderer/mainView'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/renderer/mainView/index.html',
      minify: !isDev,
      inject: 'body',
      filename: 'index.html',
      scriptLoading: 'blocking',
    }),
    new MiniCssExtractPlugin(),
  ],
};

const exportArray = isDev ? [main, preload] : [main, preload, mainView];

export default exportArray;
