import {AApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
// import {grpcMain} from './player-grpc';

export {AApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new AApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);
    // grpcMain()

  return app;
}
