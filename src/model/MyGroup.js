import { v4 as uuid } from "uuid";
import PodStorageHandler from "./../components/podService/podStoreHandler";

const auth = require('solid-auth-client');


class MyGroup {

	/**
	 * Constructor for new Group objects.
	 * 
	 * @param {String} name The name of the group.
 	 * @param {Array<friendURL>} friends The list of friends of this group.
	 */
	constructor(name, friends = []) {
		this.id = uuid().toString();
		this.name = name;
        this.friends = friends;
	}

	getId() {
		return this.id;
	}

	getName() {
		return this.name;
	}

	getFriends() {
		return this.friends;
    }
    
    getFileName() {
		return this.id + ".json";
	}

	async uploadToPod(callback) {
		let session = await auth.currentSession();
		let storageHandler = new PodStorageHandler(session);
        this.media.forEach(await async function(m){ await m.uploadToPod(); });
		await storageHandler.storeRoute(this.getFileName(), this.toJsonLd(), callback);
    }
    
	getComparableString() {
		let parsedRoute = JSON.parse(this.toJsonLd());
		parsedRoute["@context"] = "";
		parsedRoute["id"] = "";
		return JSON.stringify(parsedRoute);
	}

	toJsonLd() {
        let friendsInJson = [];
		this.friends.forEach((friend) => friendsInJson.push(friend.toJson()));
		return JSON.stringify(
			{
				"@context": {
                    "@version": 1.1,
                    "name": {
                        "@id": "schema:name",
                        "@type": "xs:string"
                    },
					"users": {
                        "@container": "@list",
                        "@id": "schema:Person"
                    },
					"url": {
                        "@id": "schema:url",
                        "@type": "xs:string"
                    },
					"schema": "http://schema.org/",
                    "xsd": "http://www.w3.org/2001/XMLSchema#"
				},
				"id": this.id,
				"name": this.name,
				"users": this.friends
			}
		);
	}

}

export default MyGroups;