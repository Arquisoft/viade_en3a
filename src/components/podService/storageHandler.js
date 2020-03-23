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

    /**
     * @param url, dejar a null para acceder al usuario registrado
     * @param filename, nombre del archivo (con extension incluida)
     * @param data, data to be stored
     */
    async storeFileAtUrl(url, filename, data) {
        if (!this.repository)
            await this.init();

        if (url === undefined || url == null) {
            url = this.repository + this.defaultFolder + "/" + filename;
        }

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
        return await fc.readFile(url);
    }

    /**
     * @returns {Array<JSON>[]} An array of Routes or null if there was an error
     */
    async getRoutes() {
        let result = [];

        let folder = await this.getFolder(null);
        for (let i = 0; i < folder.files.length; i++) {
            await this.getFile(folder.files[i].url).then(
                function (file) {
                    result.push(JSON.parse(file));
                    //console.log(result[result.length-1]); // print current route
                },
                () => {
                    result = null
                }
            )
        }
        return result;
    }

}