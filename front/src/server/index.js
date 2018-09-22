import webpack from 'webpack';
import fs from 'fs';
import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import favicon from 'express-favicon';
import R from 'ramda';
import { langs } from '../app/constants/';
import getManifest from './getManifest';
import prefetchData from './utils/prefetch/audit/prefetchData';
import prefetchPost from './utils/prefetch/audit/prefetchPost';
import prefetchTopic from './utils/prefetch/audit/prefetchTopic';
import prefetchFaq from './utils/prefetch/audit/prefetchFaq';
import prefetchPlatform from './utils/prefetch/platform/prefetchPlatform';
import prefetchAudit from './utils/prefetch/platform/prefetchAudit';
import createAudit from './utils/createAudit';
import login from './utils/login';
import loginCheck from './utils/loginCheck';

const Env = (envVars) => {
  const ENV_NAMES = {
    development: 'development',
    staging: 'staging',
    production: 'production',
  }
  const current = envVars.NODE_ENV || ENV_NAMES.development
  const envIs = (name) => {
    return (checkName = current) => {
      return name === checkName
    }
  }
  const isProduction = envIs(ENV_NAMES.production)
  const isStaging = envIs(ENV_NAMES.staging)
  const isDevelopment = envIs(ENV_NAMES.development)
  return R.merge(envVars, {
    current,
    isProduction,
    isStaging,
    isDevelopment
  })
}

dotenv.config()
const ENV = Env(process.env)
const app = express()
const port = process.env.PORT || 3000

if (ENV.isDevelopment()) {
  console.log('Loading development server configs')
  const webpackConfig = require('../../webpack.config.js')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const compiler = webpack(webpackConfig)
  const serverConfig = {
    contentBase: 'http://localhost:' + port,
    port: port,
    quiet: false,
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    inline: true,
    lazy: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    stats: { colors: true }
  }
  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
  app.use((req, res, next) => {
    req.hashManifest = ['/main.js', '/main.css', '/vendor.js'];
    next();
  });
} else {
  console.log('Loading server configs')
  const manifest = getManifest();
  app.use((req, res, next) => {
    req.hashManifest = manifest.length > 0 ? manifest : ['/main.js', '/main.css', '/vendor.js'];
    next();
  });
  app.use(helmet());
  app.disable('x-powered-by');
}
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.png'));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,X-CSRFToken');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.get('*.css', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.get('/', prefetchData);
app.get('/smart-contract-audit/', prefetchData);
app.get('/cold-staking/', prefetchData);
app.get('/financial-report/', prefetchData);
app.get('/blog/post/:slug/', prefetchPost);
app.get('/blog/topic/:slug/', prefetchTopic);
app.get('/airdrop/', prefetchData);
app.get('/faq/', prefetchFaq);
app.get('/community-guidlines/', prefetchData);
app.get(`/:lang${langs}/`, prefetchData);
app.get(`/:lang${langs}/faq/`, prefetchFaq);
app.get(`/:lang${langs}/blog/`, prefetchData);
app.get(`/:lang${langs}/blog/post/:slug/`, prefetchPost);
app.get(`/:lang${langs}/blog/topic/:slug/`, prefetchTopic);
app.get(`/:lang${langs}/airdrop/`, prefetchData);
app.get(`/:lang${langs}/cold-staking/`, prefetchData);
app.get(`/:lang${langs}/smart-contract-audit/`, prefetchData);
app.get(`/:lang${langs}/financial-report/`, prefetchData);
app.get(`/:lang${langs}/community-guidlines/`, prefetchData);
//Audit URLS
app.get('/platform/', prefetchPlatform);
app.get('/platform/:id-:slug/', prefetchAudit);
app.post('/create-audit-request/', createAudit);
app.post('/audit-login/', login);
app.post('/login-check/', loginCheck);
app.use((req, res, next) => {
  res.status(404);
  prefetchData(req, res, next);
});

app.listen(port, (err) => {
  if (err) throw err
  console.log(`Callisto Network running on por: ${port} 🚀`)
})
