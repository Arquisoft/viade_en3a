
class RouteManager {

    constructor() {
        this.memoiser = {};
        this.routes = [];
    }

    getRoutes() {
        return this.routes;
    }

    getRouteById(id) {
        // console.log(id);
        console.log(this.routes);
        return this.routes.find((route) => route.getId() === id);
    }

    getMemoiser() {
        return this.memoiser;
    }

    addRoute(route) {
        this.routes.push(route);
    }

}

export default RouteManager;