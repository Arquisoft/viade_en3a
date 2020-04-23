class RouteManager {

    constructor() {
        this.resetRoutes();
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

    addSharedRoute(route){
        this.routesSharedToMe.push(route);
    }

    getRouteById(id) {
        return this.routesSharedToMe.find((route) => route.getId() === id);
    }

    resetRoutes() {
        this.routes = [];
        this.routesSharedToMe = [];
    }

}

const routeManager = new RouteManager();
export default routeManager;