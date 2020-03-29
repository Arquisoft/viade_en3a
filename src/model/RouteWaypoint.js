
class RouteWaypoint {

    /**
     * Creates a new route waypoint given a latitude and a longitude. 
     * The altitude of such two-tuple will be obtained from an online service.
     * <https://api.airmap.com>
     * @param {Number} latitude The latitude of the point this object represents.
     * @param {Number} longitude The longitude of the point this object represents.
     * @param {Number} altitude The altitude of the point this object represents.
     */
    constructor(latitude, longitude, altitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
        if (this.altitude === -1) {
            this.askForAltitude();
        }
    }

    getAltitude() {
        return this.altitude;
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
            "altitude": this.altitude
        };
    }

    async askForAltitude() {
        console.log(this.latitude);
        console.log(this.longitude);
        await fetch("https://api.airmap.com/elevation/v1/ele/?points=" + this.latitude + "," + this.longitude)
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        this.altitude = parseInt(data["data"], 10);
                        if (isNaN(this.altitude)) {
                            this.altitude = -1;
                        }
                    });
                }
            }).catch((err) => {
                this.altitude = -1;
            });
    }

}

export default RouteWaypoint;