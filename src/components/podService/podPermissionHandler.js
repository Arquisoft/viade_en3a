import podStoreHandler from "./podStoreHandler";
import RouteMedia from "../../model/RouteMedia";
import PodHandler from "./podHandler";

const SolidAclUtils = require('solid-acl-utils');
const auth = require('solid-auth-client');

// You could also use SolidAclUtils.Permissions.READ instead of following
// This is just more convenient
const { AclApi, AclDoc, AclParser, AclRule, Permissions, Agents } = SolidAclUtils;
const { READ, WRITE, APPEND, CONTROL } = Permissions;

export default class PodPermissionHandler extends PodHandler{

    /**
     * @param {Session} currentSession - auth.currentSession()
     */
    constructor(currentSession) {
        super(currentSession);
        this.podStoreHandler = new podStoreHandler(currentSession);
    }

    async shareRouteAndResources(routeFileName, webIds, callback) {
        let url = this.repository + this.defaultFolder + this.routesDirectory + routeFileName;

        let permissions = new Permissions();
        permissions.add(READ);

        let agents = new Agents();
        for(let i = 0; i < webIds.length; i++) {
            agents.addWebId(webIds[i]);
        }

        // Share resources
        /*this.podStoreHandler.getFile(url).then(
            (file) => { this._processRouteFile(file, permissions, webIds, callback);},
            (error) => { callback(null, error); }
        );*/

        // Share route
        this.shareFile(url, permissions, agents).then(
            (ok) => {console.log("SharefilePromise ok "); callback(ok ,null)},
            (error) => { console.log("SharefilePromise err"); callback(null, error); }
        );
    }

    async shareFile(url, permissions, agents){
        console.log("About to:");
        console.log(url);

        const fetch = auth.fetch.bind(auth);
        const utils = new AclApi(fetch, { autoSave: true });

        const acl = await utils.loadFromFileUrl(url);

        let p = new Permissions();
        p.add(APPEND);
        let a = new Agents();
        a.addWebId("https://aliceuniovi.inrupt.net/profile/card#me");

        try {
            await acl.addRule(p, a);
            console.log("updated acl")
        } catch (e) {
            console.error('Error while adding rule')
            console.error(e)
            throw e
        }

        /*utils.loadFromFileUrl(url).then(
            (acl) => {
                console.log("Good");
                console.log(acl);
                console.log(this);

                let p = new Permissions();
                p.add(CONTROL);
                let a = new Agents();
                a.addWebId(this.repository);

                console.log(agents);
                acl.addRule(permissions, agents);
            },
            (err) => {console.log("Error"); console.log(err)}
        );*/
    }

    _processRouteFile(routeJson, permissions, agents, callback) {
        let parsedRoute = JSON.parse(routeJson);
        let mediaURIs = parsedRoute["media"].map( (j) => {return j["@id"];});

        for(let i = 0; i < mediaURIs.length; i++) {
            this.shareFile(mediaURIs[i], permissions, agents);
        }
    }
}