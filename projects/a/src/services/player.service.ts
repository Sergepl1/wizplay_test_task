import {getService} from '@loopback/service-proxy';
import {inject, Provider, BindingTemplate, BindingScope, extensionFor, bind} from '@loopback/core';
import {PlayerDataSource} from '../datasources';
import {Player as PlayerModel} from "../models";
import {client} from '../datasources/rpc.datasource'


export interface Player {
    getPlayer(req: {name: string}): Promise<PlayerModel>;
}

export const PLAYER_SERVICE = 'PlayerService';

export function player(protocol: string) {
    const asRecommenderService: BindingTemplate = binding => {
        extensionFor(PLAYER_SERVICE)(binding);
        binding.tag({protocol}).inScope(BindingScope.SINGLETON);
    };
    return asRecommenderService;
}

@bind(player('grpc'))
export class PlayerProvider implements Provider<Player> {
  constructor(
    @inject('datasources.Player')
    protected dataSource: PlayerDataSource = new PlayerDataSource(),
  ) {}

  async value(): Promise<Player> {
    // return getService(this.dataSource);
      // @ts-ignore
      const grpcService = await getService<Promise>(this.dataSource);
      return {
          getPlayer: async ({name}) => {
              const res = await grpcService.getPlayer({name});
              // return res

              return client.getPlayer({name}, (err = {}, resp = {})=>{
                  return resp
              });
          },
      };
  }
}
