// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-recommender
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import path from 'path';
import {
    loadPackageDefinition,
    GrpcObject,
    handleUnaryCall,
    Server,
    ServiceDefinition,
    ServerCredentials,
} from 'grpc';

import {loadSync} from '@grpc/proto-loader';
import {PlayerRepository} from './repositories';
import {DbDataSource} from './datasources'

const playerRepository = new PlayerRepository(new DbDataSource())

export const PROTO_PATH = path.join(
    __dirname,
    '../protos/player.proto',
);

export function loadPlayerService() {
    const packageDefinition = loadSync(PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });

    const pkg = loadPackageDefinition(packageDefinition);
    const player = (pkg.player as GrpcObject)
        .PlayerService as GrpcObject;
    return player;
}

/**
 * Get a new server with the handler functions in this file bound to the methods
 * it serves.
 * @return The new server object
 */
export function createGRPCPlayerServer(port = '0.0.0.0:50051') {
    const server = new Server();
    const player = loadPlayerService();

    const getPlayer: handleUnaryCall<{name: string}, unknown> = async (
        call,
        callback,
    ) => {
        console.log('call.request1', call.request)
        const result = await playerRepository.findById(1125899906842625)
        console.log('result1', result.toJSON())
        callback(null, result.toJSON());
    };

    const createPlayer: handleUnaryCall<{name: string}, unknown> = async (
        call,
        callback,
    ) => {
        console.log('call.request2', call.request)
        const result = await playerRepository.create(call.request)
        console.log('result2', result.toJSON())
        callback(null, result.toJSON());
    };

    server.addService(player.service as ServiceDefinition<unknown>, {
        getPlayer,
        createPlayer,
    });

    server.bind(port, ServerCredentials.createInsecure());
    return server;
}

export function grpcMain(port = '0.0.0.0:50051') {
    const playerServer = createGRPCPlayerServer(port);
    playerServer.start();
    console.log(`PLayer gRPC server is running at ${port}.`);
    return playerServer;
}
