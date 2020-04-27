const auth = require('solid-auth-client');
const { default: data } = require('@solid/query-ldflex');
class UserDetails {

  static async getName() {
    var session = await auth.currentSession();
    var username = data[session.webId].vcard_fn;
    return username;
  }

  static async getUsername() {
    var session = await auth.currentSession();
    return (session).webId.split('/')[2].split('.')[0];
  }

  static async getLocality() {
    return new Promise((resolve, reject) => {
      data.user["http://www.w3.org/2006/vcard/ns#hasAddress"].value
        .then((addressCard) => {
          data[addressCard].vcard_locality.value
            .then((locality) => {
              resolve(locality);
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });
  }

  static async getRegion() {
    return new Promise((resolve, reject) => {
      data.user["http://www.w3.org/2006/vcard/ns#hasAddress"].value
        .then((addressCard) => {
          data[addressCard].vcard_region.value
            .then((region) => {
              resolve(region);
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });
  }

  static async getEmail() {
    return new Promise((resolve, reject) => {
      data.user["http://www.w3.org/2006/vcard/ns#hasEmail"].value
        .then((emailCard) => {
          data[emailCard].vcard_value.value
            .then((email) => {
              resolve(email.substring('mailto:'.length));
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });
  }

  static async getPhone() {
    return new Promise((resolve, reject) => {
      data.user["http://www.w3.org/2006/vcard/ns#hasTelephone"].value
        .then((phoneCard) => {
          data[phoneCard].vcard_value.value
            .then((phone) => {
              resolve(phone.substring('tel:'.length));
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });
  }



}

export default UserDetails;