const SolidAclUtils = require('solid-acl-utils');
const auth = require('solid-auth-client');

// You could also use SolidAclUtils.Permissions.READ instead of following
// This is just more convenient
const { AclApi, AclDoc, AclParser, AclRule, Permissions, Agents } = SolidAclUtils;
const { READ, WRITE, APPEND, CONTROL } = Permissions;

export default class PodPermissionHandler {

    async test(){
        const fetch = auth.fetch.bind(auth);
        const utils = new AclApi(fetch, { autoSave: true });
        const acl = await utils.loadFromFileUrl("https://uo263624.solid.community/viade/resources/14bc7482-6505-4d84-bbb6-4bcf98a3ff71_1.jpg");

        let permissions = new Permissions();
        permissions.add(APPEND);

        let agents = new Agents();
        agents.addWebId("https://drastur.solid.community/");

        await acl.addRule(permissions, agents);
        console.log("Done!");
    }
}