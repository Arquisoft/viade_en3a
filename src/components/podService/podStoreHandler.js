const auth = require('solid-auth-client');
const FC = require('solid-file-client');
const fc = new FC(auth);

export default class PodStorageHandler {

    /**
     * @param {Session} currentSession - auth.currentSession()
     */
    constructor(currentSession) {
        this.repository = "https://" + (currentSession).webId.split('/')[2];
        this.defaultFolder = "/viade/en3a/";

        this.routesDirectory = "routes/";
        this.resourcesDirectory = "resources/";
        this.commentsDirectory = "comments/";
    }

    /**
     * Stores a route under the /viade/routes/'routeFileName' URL
     *
     * @param {String} routeFileName - File name with extension, for example: myRoute.txt or LasXanas.json
     * @param {Blob|String} data - The contents of the route
     * @param {Function} callback - Calls the function with two parameters,
     *                            + the first is the URL where the route is stored or null
     *                            + the second is the actual response or error of the POD
     */
    async storeRoute(routeFileName, data, callback){
        callback = callback ? callback : () => {};

        let url = this.repository + this.defaultFolder + this.routesDirectory + routeFileName;
        let response = fc.createFile(url, data);
        response.then(
            (response) => {callback(response.url, response)}
        ,   (error) => {callback(null, error)}
        );
    }

    /**
     *
     * @param {Function} callback - 2 Parameter function,
     *                             + the first is {Array<String>} or null if there was an error. Array with all the routes
     *                             + the second null or the error found.
     */
    async getRoutes(callback) {
        let result = [];

        let folder = await this.getFolder(this.repository + this.defaultFolder + this.routesDirectory);
        for (let i = 0; i < folder.files.length; i++) {
            await this.getFile(folder.files[i].url).then(
                function (file) {
                    result.push(file);
                },
                (error) => {callback(null, error)}
            )
        }
        callback(result, null);
    }

    async getFolder(url) {
        return fc.readFolder(url);
    }

    async getFile(url) {
        return fc.readFile(url);
    }
}