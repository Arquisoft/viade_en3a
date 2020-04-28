import { v4 as uuid } from "uuid";
import PodStorageHandler from "./../components/podService/podStoreHandler";

const auth = require('solid-auth-client');


class MyGroup {

	/**
	 * Constructor for new Group objects.
	 * 
	 * @param {String} name The name of the group.
 	 * @param {Array<usersURL>} users The list of users of this group.
	 */
	constructor(name, users = []) {
		this.id = uuid().toString();
		this.name = name;
        this.users = users;
	}

	getId() {
		return this.id;
	}

	getName() {
		return this.name;
	}

	getUsers() {
		return this.users;
    }
    
    getFileName() {
		return this.id + ".json";
	}

	async uploadToPod(callback) {
		let session = await auth.currentSession();
		let storageHandler = new PodStorageHandler(session);
		await storageHandler.storeGroup(this.getFileName(), this.toJsonLd(), callback);
    }
    
	getComparableString() {
		let parsedRoute = JSON.parse(this.toJsonLd());
		parsedRoute["@context"] = "";
		parsedRoute["id"] = "";
		return JSON.stringify(parsedRoute);
	}

	modifyFromJsonLd(parsedRoute) {
		if (parsedRoute["id"] === undefined) {
			this.id = uuid().toString();
		} else {
			this.id = parsedRoute["id"];
		}

		this.name = parsedRoute["name"];

		this.users = parsedRoute["users"];
	}

	toJsonLd() {
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
					"schema": "http://schema.org/",
                    "xsd": "http://www.w3.org/2001/XMLSchema#"
				},
				"id": this.id,
				"name": this.name,
				"users": this.users
			}
		);
	}

}

export default MyGroup;