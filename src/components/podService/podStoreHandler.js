import PodHandler from "./podHandler";
import RouteMedia from "../../model/RouteMedia";
import MyRoute from "../../model/MyRoute";

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
        let url = this.getExpectedPathForResource(resourceFileName);
        this.storeFile(url, data, callback);
    }

    getExpectedPathForResource(resourceFileName){
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
        // Not yet implemented
        callback(null, null);
    }


    async _getSharedFolder(forEachFile = () => {}){
        let result = [];
        let directory = null;
        await this.getFolder(this.repository + this.defaultFolder + this.sharedDirectory).then(
            (folder) => {directory = folder},
            (error) => { result = null; }
        );
        if (directory) {
            for(let i = 0; i < directory.files.length; i++) {
                await this.getFile(directory.files[i].url).then(
                    function (file) {
                        forEachFile(file);
                        result.push(file);
                    },
                    (error) => { forEachFile(null); }
                );
            }
        } else {
            this.createBasicFolders();
        }
        return result;
    }

    async getRoutesSharedToMe(forEachRoute = () => {}){
        let result = [];
        await this._getSharedFolder(function (file) {
            // Transform file to JSON
            let fileAsJSON = JSON.parse(file);
            let sharedRoutes = fileAsJSON["routes"];

            // get all routes files
            sharedRoutes.map((j) => { return j["@id"]; }).forEach(async function (url) {
                let routeString = await this.getFile(url);

                // Create routes from JSON
                let routeObject = new MyRoute();
                routeObject.modifyFromJsonLd(routeString);
                forEachRoute(routeObject);
                result.push(routeObject);

            }.bind(this));

        });
        return result;
    }

    async checkInbox(){
        await this.getFolder(this.repository + this.defaultFolder + this.sharedDirectory).then(
            function (folder) {
                let files = folder.files();
            },
            (error) => {  }
        );
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
        await fc.createFolder(this.repository + this.defaultFolder);
        fc.createFolder(this.repository + this.defaultFolder + this.routesDirectory);
        fc.createFolder(this.repository + this.defaultFolder + this.resourcesDirectory);
        fc.createFolder(this.repository + this.defaultFolder + this.commentsDirectory);
        fc.createFolder(this.repository + this.defaultFolder + this.sharedDirectory);
    }
}