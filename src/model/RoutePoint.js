class RoutePoint {

    /**
     * Creates a new route waypoint given a latitude and a longitude. 
     * The elevation of such two-tuple will be obtained from an online service.
     * <https://api.airmap.com>
     * @param {Number} latitude The latitude of the point this object represents.
     * @param {Number} longitude The longitude of the point this object represents.
     * @param {Number} elevation The elevation of the terrain at this coordinate pair.
     */
    constructor(latitude, longitude, elevation) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.elevation = elevation === undefined ? -1 : elevation;
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

    toJson() {
        return {
            "latitude": this.latitude,
            "longitude": this.longitude,
            "elevation": this.elevation
        };
    }

}

export default RoutePoint;