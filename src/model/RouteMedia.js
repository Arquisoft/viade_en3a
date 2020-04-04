import PodStorageHandler from "../components/podService/podStoreHandler";
const auth = require('solid-auth-client');

class RouteMedia {

    constructor(route, file = null){
        this.fileData = file;
        this.podURL = null;
        this.podExpectedPath = null;

        this.route = route;

        this.isInPod = false;
        this.isInLocal = false;
        this.name = null;
        if (file) {
            this.isInLocal = true;
            if (file.name) {
                this.name = file.name;
            }
        }
        this.calculateExpectedPodUrl();
    }

    getUploadFileName(){
        return this.route.getId() + "_" + this.name;
    }

    async calculateExpectedPodUrl(){
        if (this.name) {
            let store = new PodStorageHandler(await auth.currentSession());
            this.podExpectedPath = store.getExpectedPathForResource(this.getUploadFileName());
        }
    }

    async loadFromPod(){
        if (this.podURL) {
            let store = new PodStorageHandler(await auth.currentSession());
            store.getFile(this.podURL).then(
                (f) => {this.fileData = f; this.isInLocal = true;}, (err) => {console.log(err);} //TODO;
            );
        }
    }

    async uploadToPod(){
        if (this.fileData) {
            this.name = this.fileData.name;
            this.calculateExpectedPodUrl();
            let store = new PodStorageHandler(await auth.currentSession());
            store.storeResource(this.getUploadFileName(), this.fileData, function (url, error) {
                if (url) {
                    this.isInPod = true;
                    this.podURL = url;
                } else {
                    // Error Uploading
                }
            }.bind(this));
        }
    }
}

export default RouteMedia;