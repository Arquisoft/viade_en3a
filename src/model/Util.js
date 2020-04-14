const auth = require('solid-auth-client');

class UserDetails {

     static async getName(){
        var session = await auth.currentSession();
        var username = session.webId;
        username = username.replace('https://', '');
        username = username.replace('.solid.community/profile/card#me', '');
        return username;
    }

}

export default UserDetails;