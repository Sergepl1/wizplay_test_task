import { Entity } from '@loopback/repository';
export declare class Player extends Entity {
    id?: number;
    name?: string;
    [prop: string]: any;
    constructor(data?: Partial<Player>);
}
export interface PlayerRelations {
}
export declare type PlayerWithRelations = Player & PlayerRelations;
