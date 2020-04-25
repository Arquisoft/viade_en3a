class GroupManager {

    constructor() {
        this.groups = [];
    }

    getGroups() {
        return this.groups;
    }

    getGroupById(id) {
        return this.groups.find((group) => group.getId() === id);
    }

    addGroups(group) {
        this.groups.push(group);
    }

    resetGroups() {
        this.groups = [];
    }

}

const groupManager = new GroupManager();
export default groupManager;