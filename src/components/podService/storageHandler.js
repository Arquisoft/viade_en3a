const auth = require('solid-auth-client');
const FC = require('solid-file-client');
const fc = new FC(auth);

export default class StorageHandler {

    constructor() {
        this.repository = null;
        this.defaultFolder = "/viade/en3a/routes"
        this.init();
    }

    async init() {
        this.repository = "https://" + (await auth.currentSession()).webId.split('/')[2];
    }

    async storeFileAtUrl(url, filename, data) {
        if (!this.repository)
            await this.init();

        if (url === undefined || url === null) {
            url = this.repository + this.defaultFolder + "/" + filename;
        }

        // url =  this.repository + this.defaultFolder + url + "/" + filename;
        //console.log(url);
        if (this.repository) {
            fc.createFile(url, data);
        }
    }

    async getFolder(url) {
        if (!this.repository) {
            await this.init();
        }

        if (url === undefined || url == null) {
            url = this.repository + this.defaultFolder;
        }
        return await fc.readFolder(url);
    }

    async getFile(url) {
        if (!this.repository) {
            await this.init();
        }
        // console.log(url);
        return await fc.readFile(url);
    }

}

