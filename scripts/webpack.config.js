const webpack = require('webpack')
const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const analyzePlugins = process.env.ANALYZE ? [new BundleAnalyzerPlugin()] : []

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: path.resolve(__dirname, '../src/index.ts'),
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|bower_components|types)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    // since our webpack config store not in the same folde as node module
    modules: [path.resolve(__dirname, '../node_modules')],

    // import without filename
    extensions: ['.js', '.ts', '.tsx'],

    // auto resolve config from typescript
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json')
      })
    ]
  },
  plugins: [
    // new ForkTsCheckerWebpackPlugin({
    //   tsconfig: path.resolve(__dirname, "../tsconfig.json")
    // }),
    ...analyzePlugins
  ],
  externals: {
    react: ['react'],
    'react-dom': ['react-dom'],
  }
}
