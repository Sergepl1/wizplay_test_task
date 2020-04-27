import {
  inject,
  lifeCycleObserver,
  LifeCycleObserver,
  ValueOrPromise,
} from '@loopback/core';
import {juggler} from '@loopback/repository';
import config from './player.datasource.config.json';
import path from "path";

@lifeCycleObserver('datasource')
export class PlayerDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'Player';

  constructor(
    @inject('datasources.config.Player', {optional: true})
    dsConfig: object = config,
  ) {
      super({...dsConfig, spec: PlayerDataSource.getProtoFile()});
  }

  /**
   * Start the datasource when application is started
   */
  start(): ValueOrPromise<void> {
    // Add your logic here to be invoked when the application is started
  }


  private static getProtoFile() {
      return path.resolve(__dirname, '../../protos/player.proto');
  }
}
