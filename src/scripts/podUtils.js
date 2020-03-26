const fileClient = require('solid-file-client');
const auth = require('solid-auth-client');

async function login(credentials) {
    var result;
    if (credentials == null) {
        result = await fileClient.popupLogin().then(webId => {
            console.log(`Logged in as ${webId}.`);
            return true;
        }, err => {
            console.log(err);
            return false;
        });
    } else {
        result = await fileClient.login(credentials).then((session) => {
            console.log(`Logged in as ` + session.webId);
            return true;
        }, err => {
            console.log(err);
            return false;
        });
    }
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
    getSession: getSession,
};