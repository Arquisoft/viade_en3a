export default class PodHandler {
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
}