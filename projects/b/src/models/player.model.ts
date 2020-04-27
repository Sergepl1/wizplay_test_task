import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Player>) {
    super(data);
  }
}

export interface PlayerRelations {
  // describe navigational properties here
}

export type PlayerWithRelations = Player & PlayerRelations;
