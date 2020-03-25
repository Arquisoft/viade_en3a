
class RouteManager {

    constructor() {
        this.memoiser = {};
        this.routes = [];
    }

    getRoutes() {
        return this.routes;
    }

    getRouteById(id) {
        return this.routes.find((route) => route.id === id);
    }

    getMemoiser() {
        return this.memoiser;
    }

    addRoute(route) {
        this.routes.push(route);
    }

}

export default RouteManager;