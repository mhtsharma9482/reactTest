/* eslint consistent-return:0 */

import * as Express from 'express';
import logger from 'server/logger';

const argv = require('minimist')(process.argv.slice(2)) as {
  port?: number;
  tunnel?: boolean;
};
import setup from 'server/middlewares/frontendMiddleware';
const isDev = process.env.NODE_ENV !== 'production';
interface INgrok { connect(port: number, callback: (err: Error, url: string) => void); }
const ngrok: INgrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
import { resolve } from 'path';
const app = Express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended port number, use port 3000 if not provided
const port = argv.port || process.env.PORT || 3000;

// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, url);
    });
  } else {
    logger.appStarted(port);
  }
});
