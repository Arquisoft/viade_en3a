import { boldRoutePoints, caresRoutePoints, xanasRoutePoints } from "../components/routeList/Points";
import MyRoute from "./MyRoute";

class RouteManager {

    constructor() {

        const xanes = new MyRoute(
            "Las Xanas",
            "Miguel Menéndez",
            "Really beautiful landscape but not wise to traverse with kids. They might fall off of some cliff.",
            xanasRoutePoints
        );

        const fuso = new MyRoute(
            "Fuso de la Reina",
            "María santísima",
            "Easy to complete, mostly straight lines. Concrete does its job turning your knees into dust.",
            boldRoutePoints
        );

        const cares = new MyRoute(
            "Cares",
            "Aventura",
            "Medium difficulty, a little bit steep in some parts but still worth to witness.",
            caresRoutePoints
        );

        const picos = new MyRoute(
            "Picos de Europa",
            "Viade",
            "Interesting passages make this route unique on its own. Visit worthy.",
            boldRoutePoints
        );

        this.routes = [xanes, fuso, cares, picos];

    }

    getRoutes() {
        return this.routes;
    }

    getRouteById(id) {
        return this.routes.find((route) => route.id === id);
    }

    addRoute(route) {
        this.routes.push(route);
    }

}

export default RouteManager;