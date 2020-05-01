import PodHandler from "./podHandler";

const N3 = require('n3');
const auth = require('solid-auth-client');
const FC = require('solid-file-client');
const fc = new FC(auth);

export default class PodStorageHandler extends PodHandler {

    /**
     * @param {Session} currentSession - auth.currentSession()
     */
    constructor(currentSession) {
        super(currentSession);
        this.sharedRoutesToAdd = [];
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
     * Stores a route under the /viade/routes/'routeFileName' URL
     *
     * @param {String} routeFileName - File name with extension, for example: myRoute.txt or LasXanas.json
     * @param {Blob|String} data - The contents of the route
     * @param {Function} callback - Calls the function with two parameters,
     *                            + the first is the URL where the route is stored or null
     *                            + the second is the actual response or error of the POD
     */
    async storeGroup(groupFileName, data, callback = () => { }) {
        let url = this.repository + this.defaultFolder + this.groupsDirectory + groupFileName;
        this.storeFile(url, data, callback);
    }

    /**
     * Retrieves every single file from the POD groups directory if present. Then executes the callback function
     * passed as a parameter for each file retrieved. This operation will automatically generate the default 
     * storage folders if not present.
     *
     * @param {Function} callbackPerFile - A callback function to execute when each single file is retrieved.
     * It receives two parameters,the first is the file that just got retrieved or null if there was an error. 
     * The second receives null if everything went fine or the error found as an object.
     */
    async getGroups(callbackPerFile = (file, error) => { }) {
        return this.getFolder(this.repository + this.defaultFolder + this.groupsDirectory).then(
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
        // Not yet implemented
        callback(null, null);
    }


    async getRoutesSharedToMe(forEachFile = (file, error) => { }) {
        this.getFolder(this.repository + this.defaultFolder + this.sharedDirectory).then(
            async (directory) => {
                for (let i = 0; i < directory.files.length; i++) {
                    await this.getFile(directory.files[i].url).then(
                        async (sharedRoutesfile) => {
                            try {
                                let parsedFileRoutes = JSON.parse(sharedRoutesfile).routes;
                                for (let j = 0; j < parsedFileRoutes.length; j++) {
                                    await this.getFile(parsedFileRoutes[j]["@id"]).then(
                                        (fileContents) => {
                                            let lastFile =
                                                (i === directory.files.length - 1) &&
                                                (j === parsedFileRoutes.length - 1);
                                            forEachFile(fileContents, null, lastFile);
                                        },
                                        (error) => { forEachFile(); }
                                    );
                                }
                            } catch (error) {
                            }
                        },
                        (error) => { forEachFile(null, error); }
                    );
                }
                return directory.files.length === 0;
            },
            (error) => {
                this.createBasicFolders();
                return false;
            }
        );
    }

    /**
     * Checks for routes in the inbox, adding them onto a shared route file at /viade/shared/
     * forEachMail is called for each new route
     */
    async checkInbox(forEachMail = () => { }) {
        await this.getFolder(this.repository + "/inbox/").then(
            async function (folder) {
                await folder.files.map((file) => { return file.url; }).forEach(async function (url) { // For each message
                    await this.getFile(url).then(function (content) {
                        const parser = new N3.Parser();
                        parser.parse(content, function (error, quad, prefixes) { // parse the content of the message
                            if (quad) {
                                if (quad.predicate.id === "http://schema.org/text" && quad.object.id.includes("/viade/routes/")) { // If the quad is the url of the route
                                    forEachMail(quad.object.id);
                                    this.addRoutesAsShared([quad.object.id.split("\"").join("")]);
                                    this._eliminateFile(url);
                                }
                            }
                        }.bind(this));
                    }.bind(this),
                        (error) => { }
                    );
                }.bind(this));

            }.bind(this),
            (error) => { }
        );

    }

    _eliminateFile(url) {
        fc.delete(url);
    }

    _eliminateSharedFolder() {
        let url = this.repository + this.defaultFolder + this.sharedDirectory;
        this.getFolder(url).then(function (folder) {
            for (let i = 0; i < folder.files.length; i++) {
                this._eliminateFile(folder.files[i].url);
            }
        }.bind(this));
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

    storeFile(url, data, callback = () => { }) {
        let response = fc.createFile(url, data);
        response.then(
            (response) => { callback(response.url, response); }
            , (error) => { callback(null, error); }
        );
    }

    async addRoutesAsShared(urls) {
        let file = null;
        let filename = "en3a.json";

        // 1.- Get a shared File
        try {
            file = await this.getFile(this.repository + this.defaultFolder + this.sharedDirectory + filename);
            file = JSON.parse(file);
        } catch (e) {
            if (e.status !== 404) {
                throw e;
            } else {
                file = {
                    "@context": {
                        "@version": 1.1,
                        "routes": {
                            "@container": "@list",
                            "@id": "viade:routes"
                        },
                        "viade": "http://arquisoft.github.io/viadeSpec/"
                    },
                    "routes": []
                };
            }
        }

        // 2.- Remove duplicated routes
        let alreadyRoutes = file["routes"].map((url) => { return url["@id"]; });
        urls.forEach((url) => {
            if (alreadyRoutes.indexOf(url) === -1) {
                alreadyRoutes.push(url);
            }
        });
        urls = [];

        // 3.- Rewrite file
        file["routes"] = alreadyRoutes.map((url) => { return { "@id": url.toString() }; });

        this.storeFile(this.repository + this.defaultFolder + this.sharedDirectory + filename, JSON.stringify(file));
    }

    async getFolder(url) {
        return fc.readFolder(url);
    }

    async getFile(url) {
        return fc.readFile(url);
    }

    async createBasicFolders() {
        await fc.createFolder(this.repository + this.defaultFolder);
        fc.createFolder(this.repository + this.defaultFolder + this.routesDirectory);
        fc.createFolder(this.repository + this.defaultFolder + this.resourcesDirectory);
        fc.createFolder(this.repository + this.defaultFolder + this.commentsDirectory);
        fc.createFolder(this.repository + this.defaultFolder + this.sharedDirectory);
    }
}