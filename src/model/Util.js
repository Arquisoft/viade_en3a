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

    static async getLocality(){
        return new Promise((resolve, reject) => {
            data.user["http://www.w3.org/2006/vcard/ns#hasAddress"].value
              .then(addressCard => {
                resolve(data[addressCard].vcard_locality.value)
                  .catch(error => reject(error));
              })
              .catch(error => reject(error));
        });
    }

    static async getRegion(){
        return new Promise((resolve, reject) => {
            data.user["http://www.w3.org/2006/vcard/ns#hasAddress"].value
              .then(addressCard => {
                resolve(data[addressCard].vcard_region.value)
                  .catch(error => reject(error));
              })
              .catch(error => reject(error));
        });
    }

    static async getEmail(){
        return new Promise((resolve, reject) => {
            data.user["http://www.w3.org/2006/vcard/ns#hasEmail"].value
              .then(emailCard => {
                data[emailCard].vcard_value.value
                  .then(email => {
                    resolve(email.substring('mailto:'.length));
                  })
                  .catch(error => reject(error));
              })
              .catch(error => reject(error));
        });
    }

    static async getPhone(){
        return new Promise((resolve, reject) => {
            data.user["http://www.w3.org/2006/vcard/ns#hasTelephone"].value
              .then(phoneCard => {
                data[phoneCard].vcard_value.value
                  .then(phone => {
                    resolve(phone.substring('tel:'.length));
                  })
                  .catch(error => reject(error));
              })
              .catch(error => reject(error));
        });
    }



}

export default UserDetails;