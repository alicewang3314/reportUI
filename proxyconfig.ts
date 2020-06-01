// {
//   "/api/*": {
//     "target": "http://capmon.cor.state.pa.us/TFSAPI",
//     "secure": false,
//     "changeOrigin": true,
//     "logLevel": "debug"
//   }
// }

import {Agent} from 'http';

module.exports = {
  '/api/*': {
      target: "http://capmon.cor.state.pa.us/TFSAPI",
      secure: false,
      logLevel: "debug",
      changeOrigin: true,
      agent: new Agent({
          maxSockets: 100,
          keepAlive: true,
          maxFreeSockets: 10,
          timeout: 60000,
          keepAliveMsecs: 300000,
          
      }),
      onProxyRes: proxyRes => {
          let key = 'www-authenticate';
          proxyRes.headers[key] = proxyRes.headers[key] && proxyRes.headers[key].split(',');
      }
  }
};