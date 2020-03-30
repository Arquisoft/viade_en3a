import PodStorageHandler from "./../components/podService/podStoreHandler";
import MyRoute from "./MyRoute";

const auth = require('solid-auth-client');

class RouteManager {

    constructor() {
        this.routes = [];
        this.syncRoutesWithPod();
    }

    getRoutes() {
        return this.routes;
    }

    getRouteById(id) {
        return this.routes.find((route) => route.getId() === id);
    }

    addRoute(route) {
        this.routes.push(route);
    }

    async syncRoutesWithPod() {
        let session = await auth.currentSession();
        if (session !== null && session !== undefined) {
            let storageHandler = new PodStorageHandler(session);
            storageHandler.getRoutes((rawJsonRoutes, error) => {
                if (rawJsonRoutes === null) {
                    alert("There was an error trying to fetch your routes from the POD");
                } else {
                    this.routes = [];
                    rawJsonRoutes.forEach(rawRoute => {
                        let tempRoute = new MyRoute("", "", "", []);
                        tempRoute.modifyFromJsonLd(rawRoute);
                        this.routes.push(tempRoute);
                    });
                }
            });
        }
    }

}

export default RouteManager;