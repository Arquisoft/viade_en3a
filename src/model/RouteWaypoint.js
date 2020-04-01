
class RouteWaypoint {

    /**
     * Creates a new route waypoint given a latitude and a longitude. 
     * The elevation of such two-tuple will be obtained from an online service.
     * <https://api.airmap.com>
     * @param {Number} latitude The latitude of the point this object represents.
     * @param {Number} longitude The longitude of the point this object represents.
     */
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.elevation = -1;
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
    }

}

export default RouteWaypoint;