import PodHandler from "./podHandler";

const auth = require('solid-auth-client');
const FC = require('solid-file-client');
const fc = new FC(auth);

export default class PodStorageHandler extends PodHandler{

    /**
     * @param {Session} currentSession - auth.currentSession()
     */
    constructor(currentSession) {
        super(currentSession);
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
     * Retrieves every single file from the POD routes directory if present. Then executes the callback function
     * passed as a parameter for each file retrieved. This operation will automatically generate the default 
     * storage folders if not present.
     *
     * @param {Function} callbackPerFile - A callback function to execute when each single file is retrieved.
     * It receives two parameters,the first is the file that just got retrieved or null if there was an error. 
     * The second receives null if everything went fine or the error found as an object.
     */
    async getRoutes(callbackPerFile = (file, error) => { }) {
        return this.getFolder(this.repository + this.defaultFolder + this.routesDirectory).then(
            (directory) => {
                for (let i = 0; i < directory.files.length; i++) {
                    this.getFile(directory.files[i].url).then(
                        (file) => { callbackPerFile(file, null); },
                        (error) => { callbackPerFile(null, error); }
                    );
                }
                return directory.files.length;
            },
            (error) => {
                this.createBasicFolders();
                return 0;
            }
        ).then(
            (value) => { return value; }
        );
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
        let url = this.getExpectedPathForResource(resourceFileName);
        this.storeFile(url, data, callback);
    }

    getExpectedPathForResource(resourceFileName) {
        return this.repository + this.defaultFolder + this.resourcesDirectory + resourceFileName;
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
    async deleteAll(callback = () => { }) {
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

    async createBasicFolders() {
        fc.createFolder(this.repository + this.defaultFolder + this.routesDirectory);
        fc.createFolder(this.repository + this.defaultFolder + this.resourcesDirectory);
        fc.createFolder(this.repository + this.defaultFolder + this.commentsDirectory);
    }
}