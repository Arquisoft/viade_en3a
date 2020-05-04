class FriendManager {

    constructor() {
        this.friends = [];
    }

    getFriend() {
        return this.friends;
    }

    addFriend(friend) {
        this.friends.push(friend);
    }

    resetFriends() {
        this.friends = [];
    }

}

const friendManager = new FriendManager();
export default friendManager;