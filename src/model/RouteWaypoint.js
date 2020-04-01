import MyRoute from "./MyRoute";

class RouteWaypoint {

    /**
     * Creates a new route waypoint given a latitude and a longitude. 
     * The elevation of such two-tuple will be obtained from an online service.
     * <https://api.airmap.com>
     * @param {Number} latitude The latitude of the point this object represents.
     * @param {Number} longitude The longitude of the point this object represents.
     * @param {Number} elevation The elevation of the terrain at this coordinate pair.
     * @param {MyRoute} route The route this point belongs to.
     */
    constructor(latitude, longitude, elevation, route) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.elevation = elevation;
        this.route = route;
        this.askForElevation();
    }

    getElevation() {
        return this.elevation;
    }

    getLatitude() {
        return this.latitude;
    }

    getLongitude() {
        return this.longitude;
    }

    toJson() {
        return {
            "latitude": this.latitude,
            "longitude": this.longitude,
            "elevation": this.elevation
        };
    }

    async askForElevation() {
        console.log(this.elevation === -1 || this.elevation === undefined);
        if (this.elevation === -1 || this.elevation === undefined) {
            await fetch("https://api.airmap.com/elevation/v1/ele/?points=" + this.latitude + "," + this.longitude)
                .then((response) => {
                    if (response.status === 200) {
                        response.json().then((data) => {
                            this.elevation = parseInt(data["data"], 10);
                            if (isNaN(this.elevation)) {
                                this.elevation = -1;
                            }
                        });
                    }
                }).catch((err) => {
                    this.elevation = -1;
                });
            this.route.update();
        }
    }

}

export default RouteWaypoint;