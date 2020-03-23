import {boldRoutePoints, caresRoutePoints, xanasRoutePoints} from "../components/routeList/Points";
import MyRoute from "./MyRoute";

class RouteManager{

     constructor() {
        const xanes = new MyRoute("1",
            xanasRoutePoints,
            "Las Xanas",
            "Miguel Menéndez",
            "Really beautiful landscape but not wise to traverse with kids. They might fall off of some cliff.",
            "https://www.senditur.com/multimedia/uploads/images/Rutas/Espa%C3%B1a/Asturias/Ruta%20de%20Las%20Xanas/Ruta_de_Las_Xanas.jpg",
            [200,250,500,400,350]);

        const fuso = new MyRoute("2",
            boldRoutePoints,
            "Fuso de la Reina",
            "María santísima",
            "Easy to complete, mostly straight lines. Concrete does its job turning your knees into dust.",
            "http://www.senderismoenasturias.es/ovimolin.jpg",
            [200,250,500,400,350]);

        const cares = new MyRoute("3",
            caresRoutePoints,
            "Cares",
            "Aventura",
            "Medium difficulty, a little bit steep in some parts but still worth to witness.",
            "https://www.desnivel.com/images/2012/04/roberto-colmenero.-mi-padre-y-hermano-960x1280.jpg",
            [200,250,500,400,350]);

        const picos = new MyRoute("4",
            boldRoutePoints,
            "Picos de Europa",
            "Viade",
            "Interesting passages make this route unique on its own. Visit worthy.",
            "http://soyrural.es/wp-content/uploads/2017/07/ruta-del-Cares.jpg",
            [200,250,500,400,350]);

        this.routes=[xanes,fuso,cares,picos];

    }



    getRoutes(){
         return this.routes;
    }

    getRouteById(id){
        return this.routes.find( (route) => route.id===id);
    }

    addRoute(route){
         this.routes.push(route);
    }

}

export default RouteManager;