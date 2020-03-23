import MyRoute from "./MyRoute";
import {v4 as UUID} from "uuid";


class RouteCreator{

    createRoute(name,points){
        const route = new MyRoute(UUID().toString(),
            points,
            name,
            "default",
            "default",
            "image",
            this.calculateElevations(points)
        );
        console.log(route);
        return route;
    }

    calculateElevations(points){
        let elevations = [];

        points.forEach( (p) =>
       fetch("https://api.airmap.com/elevation/v1/ele/?points="+p.lat+","+p.lng)
                   .then( (res) => res.json())
                    .then((json) => elevations.push(parseInt(json["data"])))
                   .catch((err) => console.log("Error: "+err)));
        return elevations;
    }


}

export default RouteCreator;