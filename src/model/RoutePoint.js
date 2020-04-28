class RoutePoint {

    /**
     * Creates a new route waypoint given a latitude and a longitude. 
     * The elevation of such two-tuple will be obtained from an online service.
     * <https://api.airmap.com>
     * @param {Number} latitude The latitude of the point this object represents.
     * @param {Number} longitude The longitude of the point this object represents.
     * @param {Number} elevation The elevation of the terrain at this coordinate pair.
     * @param {String} Name of the waypoint.
     * @param {String} Description of this waypoint.
     */
    constructor(latitude, longitude, elevation = -1, name = "", description = "") {
        this.latitude = latitude;
        this.longitude = longitude;
        this.elevation = elevation;
        this.name = name;
        this.description = description;
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

    setElevation(elevation) {
        this.elevation = elevation;
    }

    async askForElevation(callback = (params) => { }) {
        if (this.elevation === -1) {
            fetch("https://api.airmap.com/elevation/v1/ele/?points=" + this.latitude + "," + this.longitude)
                .then((response) => {
                    if (response.status === 200) {
                        response.json().then((data) => {
                            this.elevation = parseInt(data["data"], 10);
                            if (isNaN(this.elevation)) {
                                this.elevation = -1;
                                callback(null);
                            } else {
                                callback(this.elevation);
                            }
                        });
                    }
                }).catch((err) => {
                    this.elevation = -1;
                    callback(null);
                });
        }
    }

    toJson() {
        return {
            "latitude": this.latitude,
            "longitude": this.longitude,
            "elevation": this.elevation
        };
    }

    toWaypointJson() {
        return {
            "name": this.name,
            "description": this.description,
            "latitude": this.latitude,
            "longitude": this.longitude,
            "elevation": this.elevation
        };
    }


}

export default RoutePoint;