import {Client, expect} from '@loopback/testlab';
import {setupApplication} from './test-helper';
import {AApplication} from "../../application";
import {BApplication} from "../../../../b/src/application";


describe('UserController', () => {
    let app: AApplication;
    let client: Client;

    before('setupAApplication', async () => {
        ({app, client} = await setupApplication());
    });

    before('setupBApplication', async () => {
        ({app: appB, client: clientB} = await setupApplication());
    });

    after(async () => {
        await appA.stop();
        await appB.stop();
    });

    it('players/me returns first player in DB', async () => {
        const res = await clientA
            .get('/users/me')
            .expect(200);

        expect(res.body).to.containEql({name: 'string12345'});
    });
})