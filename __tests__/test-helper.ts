const {
    createRestAppClient,
    givenHttpServerConfig,
    Client,
} = require('@loopback/testlab');
import {AApplication} from "../projects/a/src";
import {BApplication} from "../projects/b/src";

export async function setupApplication(Aplication: any) {
    const restConfig = givenHttpServerConfig({
        // Customize the server configuration here.
        // Empty values (undefined, '') will be ignored by the helper.
        //
        // host: process.env.HOST,
        // port: +process.env.PORT,
    });

    const app = new Aplication({
        rest: restConfig,
    });

    await app.boot();
    await app.start();

    const client = createRestAppClient(app);

    return {app, client};
}
