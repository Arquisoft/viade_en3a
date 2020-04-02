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
    async storeRoute(routeFileName, data, callback = () => { }) {
        let url = this.repository + this.defaultFolder + this.routesDirectory + routeFileName;
        this.storeFile(url, data, callback);
    }

    /**
     * Gets an Array<String> with all the files stored in the routes directory
     * Will automatically generate the default storage folders if not present
     *
     * @param {Function} callback - 2 Parameter function,
     *                             + the first is {Array<String>} or null if there was an error. Array with all the routes
     *                             + the second null or the error found.
     */
    async getRoutes(callback) {
        let result = [];
        let folder = null;

        await this.getFolder(this.repository + this.defaultFolder + this.routesDirectory).then(
            (directory) => {folder = directory;},
            (error) => {folder = null;}
        );
        if (folder) {
            // Get files from directory
            for (let i = 0; i < folder.files.length; i++) {
                await this.getFile(folder.files[i].url).then(
                    function (file) {
                        result.push(file);
                    },
                    (error) => { callback(null, error); }
                );
            }
        } else {
            // Create viade/routes folder
            this.createBasicFolders();
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
    storeResource(resourceFileName, data, callback = () => { }) {
        let url = this.repository + this.defaultFolder + this.resourcesDirectory + resourceFileName;
        this.storeFile(url, data, callback);
    }

    /**
     * Gets an Array<Blob> with all the files stored in the resources directory
     * Will automatically generate the default storage folders if not present
     *
     * @param {Function} callback - 2 Parameter function,
     *                             + the first is {Array<Blob>} or null if there was an error. Array with all the resources
     *                             + the second null or the error found.
     */
    async getResources(callback) {
        //let result = [];
        //let folder = null;
        // Not yet implemented

        callback(null, null);
    }

    /**
     * Deletes all routes, comments and resources as well as folders regarding viade from the pod
     *
     * @param callback - 1 parameter function,
     *                      + String "OK" if the process finished, null if there was an error
     */
    async deleteAll(callback = () => {}){
        fc.deleteFolderRecursively(this.repository + this.defaultFolder).then(
            (res) => { callback("OK"); },
            (error) => { callback(null); }
        );
    }

    storeFile(url, data, callback) {
        let response = fc.createFile(url, data);
        response.then(
            (response) => { callback(response.url, response); }
            , (error) => { callback(null, error); }
        );
    }

    async getFolder(url) {
        return fc.readFolder(url);
    }

    async getFile(url) {
        return fc.readFile(url);
    }

    async createBasicFolders(){
        fc.createFolder(this.repository + this.defaultFolder + this.routesDirectory);
        fc.createFolder(this.repository + this.defaultFolder + this.resourcesDirectory);
        fc.createFolder(this.repository + this.defaultFolder + this.commentsDirectory);
    }
}