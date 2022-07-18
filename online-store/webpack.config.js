const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { merge } = require('webpack-merge');
const path = require('path');

const baseConfig = {
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/inline',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './src/index.html'),
    inject: 'body',
    favicon: path.resolve(__dirname, './src/assets/images/favicon.ico')
  }),
  new CleanWebpackPlugin(),
  new CopyPlugin({
    patterns: [
      { from: "./src/assets", to: path.resolve(__dirname, 'dist/assets')  },
      { from: "./src/data", to: path.resolve(__dirname, 'dist/data') }
    ],
  }),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  if (isProductionMode) {
    return merge(baseConfig, {
      mode: 'production',
    });
  }
  else {
    return merge(baseConfig, {
      mode: 'development',
      devtool: 'inline-source-map',
      devServer: {
        static: [path.resolve(__dirname, './src')],
      },
    });

  }
};