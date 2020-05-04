const auth = require('solid-auth-client');


class MyFriend {

	/**
	 * Constructor for new Friend objects.
	 */
	constructor(image, webId, name, inbox) {
        this.image = image;
        this.webId = webId;
		this.name = name;
        this.inbox = inbox;
	}
    
    getImage() {
		return this.image;
    }

	getWebId() {
		return this.webId;
    }

    getName() {
		return this.name;
	}

    getInbox() {
		return this.inbox;
    }

}

export default MyGroup;