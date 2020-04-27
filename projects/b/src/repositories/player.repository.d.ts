import { DefaultCrudRepository } from '@loopback/repository';
import { Player, PlayerRelations } from '../models';
import { DbDataSource } from '../datasources';
export declare class PlayerRepository extends DefaultCrudRepository<Player, typeof Player.prototype.id, PlayerRelations> {
    constructor(dataSource: DbDataSource);
}
