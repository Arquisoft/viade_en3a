class RouteWaypoint {

    /**
     * Creates a new route waypoint given a latitude and a longitude. 
     * The altitude of such two-tuple will be obtained from an online service.
     * <https://api.airmap.com>
     * @param {Integer} latitude The latitude of the point this object represents.
     * @param {Integer} longitude The longitude of the point this object represents.
     */
    constructor(latitude, longitude) {
        this.altitude = -1;
        this.latitude = latitude;
        this.longitude = longitude;
        askForAltitude(latitude, longitude);
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

}

async function askForAltitude(latitude, longitude) {
    return fetch("https://api.airmap.com/elevation/v1/ele/?points=" + this.latitude + "," + this.longitude)
        .then(
            (res) => res.json()
        ).then(
            (json) => parseInt(json["data"], 10),
            () => -1
        );
}

export default RouteWaypoint;