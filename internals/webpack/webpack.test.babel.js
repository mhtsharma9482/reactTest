/**
 * TEST WEBPACK CONFIGURATION
 */
const webpack = require('webpack');
const path = require('path');

const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

const modules = [
  './',
  'node_modules',
];

module.exports = {
  entry: [
    path.join(process.cwd(), 'app/app.tsx'),
  ],
  devtool: 'inline-source-map',
  module: {
    // Some libraries don't like being run through babel.
    // If they gripe, put them here.
    noParse: [
      /node_modules(\\|\/)sinon/,
      /node_modules(\\|\/)acorn/,
    ],
    loaders: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: 'null-loader' },

      // sinon.js--aliased for enzyme--expects/requires global vars.
      // imports-loader allows for global vars to be injected into the module.
      // See https://github.com/webpack/webpack/issues/304
      { test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
        loader: 'imports-loader?define=>false,require=>false',
      },
      { test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
      },
      { test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        loader: 'null-loader',
      },
    ],
  },

  plugins: [
    // required to fail test when tsc errors emit
    function CustomErrorHandlerPlugin() {
      this.plugin(
        'done', (stats) => {
          if (process.argv.indexOf('--watch') > -1) {
            return;
          }
          if (stats.compilation.errors && stats.compilation.errors.length) {
            console.error(stats.compilation.errors.join('\n\n')); // eslint-disable-line no-console
            process.exit(1); // or throw new Error('webpack build failed.');
          }
        }
      );
    },

    new TsConfigPathsPlugin(),

    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        context: '/',
      },
    }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    })],

  // Some node_modules pull in Node-specific dependencies.
  // Since we're running in a browser we have to stub them out. See:
  // https://webpack.github.io/docs/configuration.html#node
  // https://github.com/webpack/node-libs-browser/tree/master/mock
  // https://github.com/webpack/jade-loader/issues/8#issuecomment-55568520
  node: {
    fs: 'empty',
    child_process: 'empty',
    net: 'empty',
    tls: 'empty',
  },

  // required for enzyme to work properly
  externals: {
    jsdom: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
  },
  resolve: {
    modules,
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.react.js',
      '.json',
    ],
    alias: {
      // required for enzyme to work properly
      sinon: 'sinon/pkg/sinon',
    },
  },
};
