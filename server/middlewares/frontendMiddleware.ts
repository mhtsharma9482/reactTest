/* eslint-disable global-require */
import * as Express from 'express';
import * as Path from 'path';
import * as Compression from 'compression';
import * as Webpack from 'webpack';
import * as WebpackDevMiddleware from 'webpack-dev-middleware';
import * as WebpackHotMiddleware from 'webpack-hot-middleware';
const Pkg = require(Path.resolve(process.cwd(), 'package.json'));

export interface IOptions {
  publicPath: string;
  outputPath: string;
}

// Dev middleware
const addDevMiddlewares = (app: Express.Application, webpackConfig: Webpack.Configuration) => {
  const compiler = Webpack(webpackConfig);
  const middleware = WebpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    silent: true,
    stats: 'errors-only',
  });

  app.use(middleware);
  app.use(WebpackHotMiddleware(compiler));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem;

  if (Pkg.dllPlugin) {
    app.get(/\.dll\.js$/, (req, res) => {
      const filename = req.path.replace(/^\//, '');
      res.sendFile(Path.join(process.cwd(), Pkg.dllPlugin.path, filename));
    });
  }

  app.get('*', (req, res) => {
    fs.readFile(Path.join(compiler.options.output.path, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
};

// Production middlewares
const addProdMiddlewares = (app: Express.Application, options: IOptions) => {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || Path.resolve(process.cwd(), 'build');

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(Compression());
  app.use(publicPath, Express.static(outputPath));

  app.get('*', (req, res) => res.sendFile(Path.resolve(outputPath, 'index.html')));
};

/**
 * Front-end middleware
 */
export default (app: Express.Application, options: IOptions) => {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    addProdMiddlewares(app, options);
  } else {
    const webpackConfig = require('../../internals/webpack/webpack.dev.babel') as Webpack.Configuration;
    addDevMiddlewares(app, webpackConfig);
  }

  return app;
};
