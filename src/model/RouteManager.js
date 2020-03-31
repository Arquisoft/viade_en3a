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

export default RouteManager;