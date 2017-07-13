/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');

const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

// PostCSS plugins
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');

module.exports = (options) => ({
  entry: options.entry,
  output: Object.assign({ // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  }, options.output), // Merge with env dependent settings
  module: {
    loaders: [{
      test: /\.tsx?$/,
      use: options.tsLoaders,
    }, {
      // Do not transform vendor's CSS with CSS-modules
      // The point is that they remain in global scope.
      // Since we require these CSS files in our JS or CSS files,
      // they will be a part of our compilation either way.
      // So, no need for ExtractTextPlugin here.
      test: /\.css$/,
      include: /node_modules/,
      use: [
        'style-loader',
        'css-loader',
      ],
    }, {
      // Transform our own .css files with PostCSS
      test: /^((?!\.module).)*(\.css)$/,
      exclude: [/node_modules/],
      use: options.cssLoaders,
    }, {
      // Transform our own .local.css files with PostCSS and CSS-modules
      test: /\.module\.css$/,
      include: /app/,
      use: options.cssLoadersLocal,
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      use: 'file-loader',
    }, {
      test: /\.(jpe?g|png|gif)$/,
      use: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 7,
            },
            pngquant: {
              quality: '65-90',
              speed: 4,
            },
          },
        },
      ],
    }, {
      test: /\.html$/,
      use: 'html-loader',
    }, {
      test: /\.json$/,
      use: 'json-loader',
    }, {
      test: /\.(mp4|webm)$/,
      use: 'url-loader?limit=10000',
    }],
  },
  plugins: options.plugins.concat([
    new TsConfigPathsPlugin(),
    new CheckerPlugin(),

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
        postcss: () => [
          postcssFocus(), // Add a :focus to every :hover
          cssnext({ // Allow future CSS features to be used, also auto-prefixes the CSS...
            browsers: ['last 2 versions', 'IE > 10'], // ...based on this browser list
          }),
          postcssReporter({ // Posts messages from plugins to the terminal
            clearMessages: true,
          }),
        ],
        context: '/',
      },
    }),
  ]),
  resolve: {
    // needs to match any prefixes defined in the tsconfig.json#compilerOptions.paths property
    modules: ['./', 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.react.js',
    ],
    mainFields: [
      'jsnext:main',
      'main',
    ],
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  stats: false, // Don't show stats in the console
  // progress: true
});
