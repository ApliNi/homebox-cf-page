const path = require('path');

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

/** @type {import('@rspack/cli').Configuration} */
module.exports = {
  entry: {
    main: './src/index.tsx',
  },
  output: {
    clean: true,
    filename: "[name].js",
    chunkFilename: "[name].[contenthash:8].js",
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  optimization: {
    chunkIds: "deterministic",
    splitChunks: {
      name: false,
    },
  },
  builtins: {
    html: [{ template: './src/index.html' }],
    emotion: true,
    react: {
      importSource: '@emotion/react',
    },
  },
  devServer: {
    host: process.env.HOMEBOX_DEV_HOST || '127.0.0.1',
    port: 8086,
    proxy: {
      '/api': 'http://127.0.0.1:3300',
    },
  },
  devtool: !prod ? undefined : false
};
