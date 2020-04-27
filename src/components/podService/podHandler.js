export default class PodHandler {
    /**
     * @param {String|Session} currentSession - auth.currentSession() or a String with the root of the POD Storage as
 *                                              https://example.solid.community, note the lack of '/' at the end
     */
    constructor(currentSession) {
        if (currentSession instanceof String) {
            this.repository = currentSession;
        }
        else {
            this.repository = "https://" + (currentSession).webId.split('/')[2];
        }
        this.defaultFolder = "/viade/";

        this.routesDirectory = "routes/";
        this.resourcesDirectory = "resources/";
        this.commentsDirectory = "comments/";
        this.sharedDirectory = "shared/";
        this.inboxDirectory = "inbox/";
        this.groupsDirectory = "groups/";
    }
}