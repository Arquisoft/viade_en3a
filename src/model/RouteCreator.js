import MyRoute from "./MyRoute";
import {v4 as uuid} from "uuid";


class RouteCreator{

    createRoute(name,points){
        const route = new MyRoute(uuid().toString(),
            points,
            name,
            "default",
            "default",
            "image",
            this.calculateElevations(points)
        );
        return route;
    }

    calculateElevations(points){
        let elevations = [];

        points.forEach( (p) =>
       fetch("https://api.airmap.com/elevation/v1/ele/?points="+p.lat+","+p.lng)
                   .then( (res) => res.json())
                    .then((json) => elevations.push(parseInt(json["data"],10))));

        return elevations;
    }


}

export default RouteCreator;