import { v4 as uuid } from "uuid";
import RoutePoint from "./RoutePoint";
import PodStorageHandler from "./../components/podService/podStoreHandler";
import RouteMedia from "./RouteMedia";
import { latLng } from "leaflet";

const auth = require('solid-auth-client');

/**
 * Returns an Array<RoutePoint> that represent the same set of points 
 * received as a parameter.
 * @param {Array<{lat:"", lng:"", elv:""}>} points The list of points to 
 * transform.
 */
function processPoints(points) {
	let list = [];
	points.forEach((point) => {
		let routePoint = new RoutePoint(point.lat, point.lng, point.elv, point.name, point.description);
		routePoint.askForElevation(() => { });
		list.push(routePoint);
	});
	return list;
}

/**
 * Calculates in meters the length of the route.
 * @param points - A set of points containing lat and lng
 * @returns {number} - a float with the total distance in meters
 */
function calculateRouteLength(points) {
	var distance = 0;
	for (var i = 1; i < points.length; i++) {
		let thisPoint = latLng(points[i].lat, points[i].lng);
		let previousPoint = latLng(points[i - 1].lat, points[i - 1].lng);
		distance += thisPoint.distanceTo(previousPoint);
	}
	return distance;
}

class MyRoute {

	/**
	 * Constructor for new Route objects. Will be represented by an id 
	 * (uuid generation), an array of RoutePoint objects holding latitude, 
	 * longitude and altitude, a name, an author and a description.
	 * 
	 * @param {String} name The name of the route.
	 * @param {String} author The creator of the route.
	 * @param {String} description A description of the route.
 	 * @param {Array<{lat:"", lng:""}>} points The list of points of this rule.
	 */
	constructor(name, author, description, points = []) {
		this.id = uuid().toString();
		this.name = name;
		this.author = author;
		this.description = description;
		this.points = processPoints(points);
		this.media = [];
		this.routeLength = calculateRouteLength(points);
	}

	getId() {
		return this.id;
	}

	getName() {
		return this.name;
	}

	getAuthor() {
		return this.author;
	}

	getDescription() {
		return this.description;
	}

	getPoints() {
		return this.points;
	}

	getFileName() {
		return this.id + ".json";
	}

	/**
	 * Returns the route length in kilometers and with two decimals.
	 * @returns {number} - Route length with format -> "###.## km"
	 */
	getRouteLength() {
		let value = this.routeLength / 1000;
		return value.toFixed(2) + " km";
	}

	addMedia(file) {
		this.media.push(new RouteMedia(this, file));
	}

	addSimplePoints(points) {

		points.forEach((point) => {
			let exists = this.points.find((p) => p.getLatitude() === point.lat || p.getLongitude() === point.lng);

			if (exists === undefined) { //point not exists in waypoints
				let newPoint = new RoutePoint(point.lat, point.lng, point.elv);
				newPoint.askForElevation();
				this.points.push(newPoint);
			}
		});

	}

	async uploadToPod(callback) {
		let session = await auth.currentSession();
		let storageHandler = new PodStorageHandler(session);


		//this.media.forEach(await async function(m){ await m.uploadToPod(); });
		await this.uploadMedia();
		await storageHandler.storeRoute(this.getFileName(), this.toJsonLd(), callback);
	}

	async uploadMedia() {
		for (let i = 0; i < this.media.length; i++) {
			await this.media[i].uploadToPod();
		}
	}

	updatePoints(newPoints, callback) {
		let newListOfPoints = [];
		newPoints.forEach((newPoint) => {
			let found = this.points.find(
				(each) => each.getLatitude() === newPoint.lat && each.getLongitude() === newPoint.lng
			);
			if (found === undefined) {
				let tempPoint = new RoutePoint(newPoint.lat, newPoint.lng);
				tempPoint.askForElevation(
					(elevationResult, pointsList = newListOfPoints) => {
						if (elevationResult !== null) {
							callback(pointsList);
						}
					}
				);
				newListOfPoints.push(tempPoint);
			} else {
				newListOfPoints.push(found);
				callback(newListOfPoints);
			}
		});
		this.points = newListOfPoints;
		callback(this.points);
	}

	getComparableString() {
		let parsedRoute = JSON.parse(this.toJsonLd());
		parsedRoute["@context"] = "";
		parsedRoute["id"] = "";
		return JSON.stringify(parsedRoute);
	}

	modifyFromJsonLd(parsedRoute) {
		if (parsedRoute["id"] === undefined) {
			this.id = uuid().toString();
		} else {
			this.id = parsedRoute["id"];
		}

		this.name = parsedRoute["name"];
		this.author = parsedRoute["author"];
		this.description = parsedRoute["description"];


		let rawWaypoints = parsedRoute["waypoints"];
		rawWaypoints = rawWaypoints.map((jsonPoint) => {
			return {
				lat: jsonPoint["latitude"],
				lng: jsonPoint["longitude"],
				elv: jsonPoint["elevation"],
				name: jsonPoint["name"],
				description: jsonPoint["description"]
			};
		});

		this.points = processPoints(rawWaypoints);


		let rawPoints = parsedRoute["points"];
		rawPoints = rawPoints.map((jsonPoint) => {
			return {
				lat: jsonPoint["latitude"],
				lng: jsonPoint["longitude"],
				elv: jsonPoint["elevation"]
			};
		});
		this.addSimplePoints(rawPoints);


		this.media = [];
		let mediaURIs = parsedRoute["media"];
		mediaURIs.map((j) => { return j["@id"]; }).forEach(function (url) {
			let newMedia = new RouteMedia(this);
			newMedia.isInPod = true;
			newMedia.podURL = url;
			this.media.push(newMedia);
		}.bind(this));

		this.routeLength = calculateRouteLength(rawPoints);
	}

	toJsonLd() {
		let pointsInJson = [];
		let waypointsInJson = [];
		let mediaInJson = [];
		this.points.forEach((point) => pointsInJson.push(point.toJson()));
		this.points.forEach((point) => waypointsInJson.push(point.toWaypointJson()));
		this.media.map((media) => { return media.getPodUrl(); }).forEach((url) => {
			mediaInJson.push(
				{
					"@id": url
				}
			);
		});
		return JSON.stringify(
			{
				"@context": {
					"@version": 1.1,
					"comments": {
						"@id": "viade:comments",
						"@type": "@id"
					},
					"description": {
						"@id": "schema:description",
						"@type": "xsd:string"
					},
					"media": {
						"@container": "@list",
						"@id": "viade:media"
					},
					"name": {
						"@id": "schema:name",
						"@type": "xsd:string"
					},
					"points": {
						"@container": "@list",
						"@id": "viade:points"
					},
					"latitude": {
						"@id": "schema:latitude",
						"@type": "xsd:double"
					},
					"longitude": {
						"@id": "schema:longitude",
						"@type": "xsd:double"
					},
					"elevation": {
						"@id": "schema:elevation",
						"@type": "xsd:double"
					},
					"author": {
						"@id": "schema:author",
						"@type": "@id"
					},
					"rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
					"rdfs": "http://www.w3.org/2000/01/rdf-schema#",
					"schema": "http://schema.org/",
					"viade": "http://arquisoft.github.io/viadeSpec/",
					"xsd": "http://www.w3.org/2001/XMLSchema#"
				},
				"id": this.id,
				"name": this.name,
				"author": this.author,
				"description": this.description,
				"comments": "",
				"media": mediaInJson,
				"waypoints": waypointsInJson,
				"points": pointsInJson
			}
		);
	}

}

export default MyRoute;