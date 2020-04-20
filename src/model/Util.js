const auth = require('solid-auth-client');
const { default: data } = require('@solid/query-ldflex');

class UserDetails {

     static async getName(){
        var session = await auth.currentSession();
        var username = data[session.webId].name
        return username;
    }

}

export default UserDetails;