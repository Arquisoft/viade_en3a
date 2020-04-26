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

    getSharedRouteById(id) {
        return this.routesSharedToMe.find((route) => route.getId() === id);
    }

    resetRoutes() {
        this.routes = [];
        this.routesSharedToMe = [];
    }

    getAnyRouteById(id) {
        return this.getRouteById(id) || this.getSharedRouteById(id);
    }
}

const routeManager = new RouteManager();
export default routeManager;