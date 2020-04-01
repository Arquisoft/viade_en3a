const auth = require('solid-auth-client');
const FC = require('solid-file-client');
const fc = new FC(auth);

var session = null;

async function login(idp) {
    session = await auth.currentSession();
    if (!session) {
        await auth.login(idp);
    }
}

async function run() {
    await login('https://solid.community');
    await fc.createFile("https://uo263624.solid.community/asdf/file", "HOla PeRsona");
    let result = await fc.readFolder("https://uo263624.solid.community/asdf/");
}

export default run;