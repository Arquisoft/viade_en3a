const auth = require('solid-auth-client')
const FC   = require('solid-file-client')
const fc   = new FC( auth )


var session = null;

async function login(idp) {
    session = await auth.currentSession();
    if (!session)
        await auth.login(idp);
    else
        console.log(`Logged in as ${session.webId}`);
}

async function run(){
    await login('https://solid.community');

    //if (!session) { session = await auth.login() }
    console.log(`Logged in as ${session.webId}.`)
    await fc.createFile( "https://uo263624.solid.community/asdf/file", "HOla PeRsona")
    let result = await fc.readFolder( "https://uo263624.solid.community/asdf/")
    console.log(result)
}

export default run;