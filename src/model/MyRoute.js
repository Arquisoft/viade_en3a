import { v4 as uuid } from "uuid";
import RoutePoint from "./RoutePoint";
import PodStorageHandler from "./../components/podService/podStoreHandler";
import RouteMedia from "./RouteMedia";

const auth = require('solid-auth-client');

/**
 * Returns an Array<RoutePoint> that represent the same set of points 
 * received as a parameter.
 * @param {Array<{lat:"", lng:"", elv:""}>} points The list of points to 
 * transform.
 */
function processPoints(points) {
	let list = [];
	points.forEach((point) => list.push(new RoutePoint(point.lat, point.lng, point.elv)));
	return list;
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
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
	constructor(name, author, description, points) {
		this.id = uuid().toString();
		this.name = name;
		this.author = author;
		this.description = description;
		this.points = processPoints(points);
		this.media = [];
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

	addMedia(file){
		this.media.push( new RouteMedia(this, file) );
	}

	async uploadToPod(callback) {
		let session = await auth.currentSession();
		let storageHandler = new PodStorageHandler(session);
		this.media.forEach( (m) => {m.uploadToPod();} );
		await this.askForElevation();
		await sleep(1000);
		await storageHandler.storeRoute(this.getFileName(), this.toJsonLd(), callback);
	}

	async askForElevation() {
		for (let i = 0; i <= this.points.length - 1; i++) {
			let point = this.points[i];
			if (point.getElevation() === -1 || point.getElevation() === undefined) {
				await fetch("https://api.airmap.com/elevation/v1/ele/?points=" + point.getLatitude() + "," + point.getLongitude())
					.then((response) => {
						if (response.status === 200) {
							response.json()
								.then((data) => {
									point.setElevation(parseInt(data["data"], 10));
									if (isNaN(point.getElevation())) {
										point.setElevation(-1);
									}
								});
						}
					}).catch((err) => {
						point.setElevation(-1);
					});
			}
		}
	}

	getComparableString() {
		let parsedRoute = JSON.parse(this.toJsonLd());
		parsedRoute["@context"] = "";
		parsedRoute["id"] = "";
		return JSON.stringify(parsedRoute);
	}

	modifyFromJsonLd(stringData) {
		let parsedRoute = JSON.parse(stringData);
		this.id = parsedRoute["id"];
		this.name = parsedRoute["name"];
		this.author = parsedRoute["author"];
		this.description = parsedRoute["description"];
		let rawPoints = parsedRoute["points"];
		rawPoints = rawPoints.map((jsonPoint) => {
			return {
				lat: jsonPoint["latitude"],
				lng: jsonPoint["longitude"],
				elv: jsonPoint["elevation"]
			};
		});
		this.points = processPoints(rawPoints);

		this.media = [];
		let mediaURIs = parsedRoute["media"];
		mediaURIs.map( (j) => {return j["@id"];}).forEach(function (url) {
			let newMedia = new RouteMedia(this);
			newMedia.isInPod = true;
			newMedia.podURL = url;
			this.media.push(newMedia);
		}.bind(this));
	}

	toJsonLd() {
		let poinstInJson = [];
		let mediaInJson = [];
		this.points.forEach((point) => poinstInJson.push(point.toJson()));
		this.media.map( (media) => {return media.podURL;} ).forEach( url => mediaInJson.push(
			{
				"@id" : url
			}
		));
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
				"waypoints": [],
				"points": poinstInJson
			}
		);
	}

}

export default MyRoute;