import {inject} from '@loopback/core';
import {
  post,
  getModelSchemaRef,
  requestBody,
} from '@loopback/rest';
import {Player} from '../models';
import {Player as PlayerService} from '../services/player.service';

export class PlayerController {
  constructor(
    @inject('services.Player')
    public player: PlayerService,
  ) {}

  @post('/players/me', {
    responses: {
      '200': {
        description: 'B model instance',
        content: {'application/json': {schema: getModelSchemaRef(Player)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {
            title: 'NewPlayer',
            exclude: ['id', 'name'],
          }),
        },
      },
    })
        player: Omit<Player, 'id'>,
  ): Promise<Player> {

    return this.player.getPlayer({name: <string>player.name});
  }
}
