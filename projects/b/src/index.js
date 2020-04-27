"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("./application");
exports.BApplication = application_1.BApplication;
const player_grpc_1 = require("./player-grpc");
async function main(options = {}) {
    console.log('options1', options);
    // console.log('ApplicationConfig1', ApplicationConfig)
    const app = new application_1.BApplication({ ...options, rest: { ...options.rest, port: 3001 } });
    await app.boot();
    await app.start();
    const url = app.restServer.url;
    console.log(`Server is running at ${url}`);
    console.log(`Try ${url}/ping`);
    player_grpc_1.grpcMain();
    return app;
}
exports.main = main;
//# sourceMappingURL=index.js.map