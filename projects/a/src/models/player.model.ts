import {Entity, model, property} from '@loopback/repository';

@model()
export class Player extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name?: string;


  constructor(data?: Partial<Player>) {
    super(data);
  }
}

export interface PlayerRelations {
  // describe navigational properties here
}

export type PlayerWithRelations = Player & PlayerRelations;
