"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-recommender
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const grpc_1 = require("grpc");
const proto_loader_1 = require("@grpc/proto-loader");
const repositories_1 = require("./repositories");
const playerRepository = new repositories_1.PlayerRepository({});
exports.PROTO_PATH = path_1.default.join(__dirname, '../protos/player.proto');
function loadPlayerService() {
    const packageDefinition = proto_loader_1.loadSync(exports.PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });
    const pkg = grpc_1.loadPackageDefinition(packageDefinition);
    const player = pkg.player
        .PlayerService;
    return player;
}
exports.loadPlayerService = loadPlayerService;
/**
 * Get a new server with the handler functions in this file bound to the methods
 * it serves.
 * @return The new server object
 */
function createGRPCPlayerServer(port = '0.0.0.0:50051') {
    const server = new grpc_1.Server();
    const player = loadPlayerService();
    const getPlayer = (call, callback) => {
        console.log('call.request1', call.request);
        callback(null, { player: {} });
    };
    server.addService(player.service, {
        getPlayer,
    });
    server.bind(port, grpc_1.ServerCredentials.createInsecure());
    return server;
}
exports.createGRPCPlayerServer = createGRPCPlayerServer;
function grpcMain(port = '0.0.0.0:50051') {
    const playerServer = createGRPCPlayerServer(port);
    playerServer.start();
    console.log(`PLayer gRPC server is running at ${port}.`);
    return playerServer;
}
exports.grpcMain = grpcMain;
//# sourceMappingURL=player-grpc.js.map