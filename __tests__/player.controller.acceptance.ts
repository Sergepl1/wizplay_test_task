import {Client, expect} from '@loopback/testlab';
import {setupApplication} from './test-helper';
import {AApplication} from "../projects/a/src";
import {BApplication} from "../projects/b/src";


describe('UserController', () => {
    let appA: AApplication;
    let appB: BApplication;
    let clientA: Client;
    let clientB: Client;

    // @ts-ignore
    before('setupAApplication', async () => {
        // {app: appA, client: clientA} = await setupApplication(AApplication);
        const result = await setupApplication(AApplication);
        appA = result.app
        clientA = result.client
    });

    // @ts-ignore
    before('setupBApplication', async () => {
        const result = await setupApplication(BApplication);
        appB = result.app
        clientB = result.client
    });

    // @ts-ignore
    after(async () => {
        await appA.stop();
        await appB.stop();
    });

    // @ts-ignore
    it('players/me returns first player in DB', async () => {
        const res = await clientA
            .get('/users/me')
            .expect(200);

        expect(res.body).to.containEql({name: 'string12345'});
    });
})