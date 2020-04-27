import {BApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
import {grpcMain} from './player-grpc';

export {BApplication};

export async function main(options: ApplicationConfig = {}) {
    console.log('options1', options)
    // console.log('ApplicationConfig1', ApplicationConfig)
  const app = new BApplication({...options, rest: {...options.rest, port: 3001}});
  await app.boot();
  await app.start();

  const url = app.restServer.url;
    console.log('app1', app.repository)
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);
    grpcMain();

  return app;
}
