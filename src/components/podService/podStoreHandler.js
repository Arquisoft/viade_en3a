const auth = require('solid-auth-client');
const FC = require('solid-file-client');
const fc = new FC(auth);

export default class PodStorageHandler {

    /**
     * @param {Session} currentSession - auth.currentSession()
     */
    constructor(currentSession) {
        this.repository = "https://" + (currentSession).webId.split('/')[2];
        this.defaultFolder = "/viade/";

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
    async storeRoute(routeFileName, data, callback = () => {}){
        let url = this.repository + this.defaultFolder + this.routesDirectory + routeFileName;
        this.storeFile(url, data, callback)

        /*
        let response = fc.createFile(url, data);
        response.then(
            (response) => {callback(response.url, response)}
        ,   (error) => {callback(null, error)}
        );
        */
    }

    /**
     * Gets an Array<String> with all the files stored in the routes directory
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
                (error) => {callback(null, error);}
            );
        }
        callback(result, null);
    }

    /**
     * Stores a resource under the /viade/resources/'resourceFileName' URL
     *
     * @param {String} resourceFileName - File name with extension, for example: samplePic.png or LasXanas.jpeg
     * @param {Blob|String} data - The contents of the resource
     * @param {Function} callback - Calls the function with two parameters,
     *                            + the first is the URL where the resource is stored or null if it wasnt stored
     *                            + the second is the actual response or error of the POD
     */
    storeResource(resourceFileName, data, callback = () => {}){
        let url = this.repository + this.defaultFolder + this.resourcesDirectory + resourceFileName;
        this.storeFile(url, data, callback);
    }

    storeFile(url, data, callback) {
        let response = fc.createFile(url, data);
        response.then(
            (response) => {callback(response.url, response);}
            ,   (error) => {callback(null, error);}
        );
    }

    async getFolder(url) {
        return fc.readFolder(url);
    }

    async getFile(url) {
        return fc.readFile(url);
    }
}