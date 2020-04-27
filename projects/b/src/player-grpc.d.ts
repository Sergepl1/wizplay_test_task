import { GrpcObject, Server } from 'grpc';
export declare const PROTO_PATH: string;
export declare function loadPlayerService(): GrpcObject;
/**
 * Get a new server with the handler functions in this file bound to the methods
 * it serves.
 * @return The new server object
 */
export declare function createGRPCPlayerServer(port?: string): Server;
export declare function grpcMain(port?: string): Server;
