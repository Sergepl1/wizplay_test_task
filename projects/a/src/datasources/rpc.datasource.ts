import path from "path";



const PROTO_PATH = path.join(
    __dirname,
    '../../protos/player.proto',
);

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const player_proto = grpc.loadPackageDefinition(packageDefinition).player;

export const client = new player_proto.PlayerService('localhost:50051', grpc.credentials.createInsecure());


