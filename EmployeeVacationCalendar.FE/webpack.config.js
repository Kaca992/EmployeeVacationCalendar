const path = require('path');
const webpack = require('webpack');

const rules = require('./webpack/rules');
const plugins = require('./webpack/plugins');

// used for proxying if we have web api on a different port (hostname)
const devServerLocation = 'http://localhost:50971';

module.exports = (env) => {
  const isProduction = env && env.prod;
  return {
    entry: {
      // IE support, if not needed you can remove this and babel from awesome TS loader
      babel_polyfill: 'babel-polyfill',
      main: './src/index.tsx'
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    output: {
      filename: '[name].[hash].bundle.js',
      chunkFilename: '[name].[hash].bundle.js',
      path: path.join(plugins.BundleOutputDir, 'dist'),
      publicPath: isProduction ? './dist' : '/'
    },
    // sets some default plugins like uglify
    mode: isProduction ? 'production' : 'development',
    resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx'],
      alias: {
        // CUSTOM PACKAGES:
        // enables custom paths on import. IMPORTANT!: need to be defined in typescript path also + baseUrl
        '@common': path.resolve(__dirname, 'src/common'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@containers': path.resolve(__dirname, 'src/containers'),
        '@actions': path.resolve(__dirname, 'src/actions'),
        '@reducers': path.resolve(__dirname, 'src/reducers')
      }
    },
    module: {
      rules: rules.getRules(isProduction)
    },
    plugins: plugins.getPlugins(isProduction),
    optimization: isProduction ? {
      splitChunks: {
        chunks: 'all'
      },
      minimizer: [new plugins.OptimizeCSSAssetsPlugin({})]
    } : {},
    devServer: {
      contentBase: path.resolve(__dirname, 'src'),
      hot: true,
      proxy: {
        '/api': devServerLocation
      }
    }
  }
};