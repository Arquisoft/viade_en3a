const fileClient = require('solid-file-client');
const auth = require('solid-auth-client');

const credentials = {
    "idp": "https://solid.community",
    "username": "viadeen3a",
    "password": "viadeen3atest123"
}

async function login() {
    var result;
    let session = await auth.currentSession()
    if (!session) { 
        await auth.login(credentials).then(
            (param) => { console.log(param)}, (param) => { console.log(param)}) 
        result = true;
    }
    console.log(`Logged in as ${session.webId}.`)
    return result;
}

async function logout(){
    solid.auth.logout();
};

async function getSession() {
    return await solid.auth.currentSession();
};

module.exports = {
    login: login,
    logout: logout,
    getSession: getSession
};