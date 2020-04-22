const auth = require('solid-auth-client');
const { default: data } = require('@solid/query-ldflex');
const $rdf = require('rdflib');
const store  = $rdf.graph();

class UserDetails {

    static async getName(){
        var session = await auth.currentSession();
        var username = data[session.webId].vcard_fn
        return username;
    }
    static async getEmail(){
        var session = await auth.currentSession();
        var me = store.sym(session.webId);
        var profile = me.doc();
        var VCARD = new $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
        var name = store.any(me, VCARD('role'));
        return name.value;
    }



}

export default UserDetails;