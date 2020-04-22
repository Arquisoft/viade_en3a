class RouteManager {

    constructor() {
        this.routes = [];
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

    resetRoutes() {
        this.routes = [];
    }

}

const routeManager = new RouteManager();
export default routeManager;