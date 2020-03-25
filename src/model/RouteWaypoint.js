
class RouteWaypoint {

    /**
     * Creates a new route waypoint given a latitude and a longitude. 
     * The altitude of such two-tuple will be obtained from an online service.
     * <https://api.airmap.com>
     * @param {Number} latitude The latitude of the point this object represents.
     * @param {Number} longitude The longitude of the point this object represents.
     * @param {Map<[Number, Number], Number>} memoiser The memoiser dictionary keeping 
     * track of already calculated points.
     */
    constructor(latitude, longitude, memoiser) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.memoiser = memoiser;
        this.altitude = -1;
        this.askForAltitude();
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
            "longitude": this.longitude
        };
    }

    async askForAltitude() {
        let memoAltitude = this.memoiser[JSON.stringify(this.toJson())];
        if (memoAltitude !== undefined) {
            this.altitude = memoAltitude;
        } else {
            await fetch("https://api.airmap.com/elevation/v1/ele/?points=" + this.latitude + "," + this.longitude)
                .then(
                    (res) => res.json()
                ).then(
                    (json) => {
                        this.altitude = parseInt(json["data"], 10);
                        this.memoiser[JSON.stringify(this.toJson())] = this.altitude;
                    });
        }
    }

}

export default RouteWaypoint;