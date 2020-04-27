import PodStoreHandler from "./podStoreHandler";
import PodHandler from "./podHandler";

const SolidAclUtils = require('solid-acl-utils');
const auth = require('solid-auth-client');

const { AclApi } = SolidAclUtils;

// const { AclApi, AclDoc, AclParser, AclRule, Permissions, Agents } = SolidAclUtils;
// const { READ, WRITE, APPEND, CONTROL } = Permissions;

export default class PodPermissionHandler extends PodHandler{

    /**
     * @param {Session} currentSession - auth.currentSession()
     */
    constructor(currentSession) {
        super(currentSession);
        this.podStoreHandler = new PodStoreHandler(currentSession);
    }

    /**
     * @param {String} routeFileName - Route id + .json extension
     * @param {Array<String>|SolidAclUtils.Agents} webIds - Web ids of people to unshare with, either as "https://example.solid.community" or "https://example.solid.community/profile/card#me"
     */
    async unshareRouteAndResources(routeFileName, webIds) {
        let url = this.repository + this.defaultFolder + this.routesDirectory + routeFileName;

        let permissions = SolidAclUtils.Permissions.READ;

        // Share resources
        this.podStoreHandler.getFile(url).then(
            (file) => { this._processRouteFileForUnshare(file, permissions, webIds); },
            (error) => {  }
        );

        // Share route
        await this.unshareFile(url, permissions, webIds);
    }

    /**
     * @param {String} routeFileName - Route id + .json extension
     * @param {String|Array<String>|SolidAclUtils.Agents} webIds - Web ids of people to share with, either as "https://example.solid.community" or "https://example.solid.community/profile/card#me"
     */
    async shareRouteAndResources(routeFileName, webIds) {
        let url = this.repository + this.defaultFolder + this.routesDirectory + routeFileName;

        let permissions = SolidAclUtils.Permissions.READ;

        // Share resources
        this.podStoreHandler.getFile(url).then(
            (file) => { this._processRouteFileForShare(file, permissions, webIds); },
            (error) => {  }
        );

        // Share route
        await this.shareFile(url, permissions, webIds);
    }

    /**
     * @param {String} url - URL of the file/folder to share inside the pod
     * @param {SolidAclUtils.Permissions} permissions - Permission to give to the file
     * @param {String|Array<String>|SolidAclUtils.Agents} agents - People to share with
     */
    async shareFile(url, permissions, agents){
        const fetch = auth.fetch.bind(auth);
        const utils = new AclApi(fetch, { autoSave: true });
        const acl = await utils.loadFromFileUrl(url);

        try {
            await acl.addRule(permissions, agents);
        } catch (e) {
            throw e;
        }
    }

    /**
     * @param {String} url - URL of the file/folder to unshare inside the pod
     * @param {SolidAclUtils.Permissions} permissions - Permission to remove of the file
     * @param {String|Array<String>|SolidAclUtils.Agents} agents - People to unshare with
     */
    async unshareFile(url, permissions, agents){
        const fetch = auth.fetch.bind(auth);
        const utils = new AclApi(fetch, { autoSave: true });
        const acl = await utils.loadFromFileUrl(url);

        try {
            await acl.deleteRule(permissions, agents);
        } catch (e) {
            throw e;
        }
    }

    _processRouteFileForShare(routeJson, permissions, agents) {
        let parsedRoute = JSON.parse(routeJson);
        let mediaURIs = parsedRoute["media"].map( (j) => {return j["@id"];});

        for(let i = 0; i < mediaURIs.length; i++) {
            this.shareFile(mediaURIs[i], permissions, agents);
        }
    }

    _processRouteFileForUnshare(routeJson, permissions, agents) {
        let parsedRoute = JSON.parse(routeJson);
        let mediaURIs = parsedRoute["media"].map( (j) => {return j["@id"];});

        for(let i = 0; i < mediaURIs.length; i++) {
            this.unshareFile(mediaURIs[i], permissions, agents);
        }
    }
}