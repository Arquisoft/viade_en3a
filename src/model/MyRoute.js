import { v4 as uuid } from "uuid";
import RouteWaypoint from "./RouteWaypoint";

function processPoints(waypoints) {
	let list = [];
	console.log(waypoints);
	waypoints.forEach((point) => list.push(new RouteWaypoint(point[0], point[1])));
	console.log(list);
	return list;
}

class MyRoute {

	/**
	 * Constructor for new Route objects. Will be represented by an id 
	 * (uuid generation), an array of RouteWaypoint objects holding latitude, 
	 * longitude and altitude, a name, an author and a description.
	 * 
	 * @param {String} name The name of the route.
	 * @param {String} author The creator of the route.
	 * @param {String} description A description of the route.
 	 * @param {Array<{lat:"", lng:""}>} points The list of waypoints of this rule.
	 */
	constructor(name, author, description, waypoints) {
		this.id = uuid().toString();
		this.name = name;
		this.author = author;
		this.description = description;
		this.waypoints = processPoints(waypoints);
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

	getWaypoints() {
		return this.waypoints;
	}

	toJsonLd() {
		let poinstInJson = [];
		// this.waypoints.arrray.forEach((point) => poinstInJson.push(point.toJson()));
		let result = {
			"@context": {
				"@version": 1.1,
				"comments": {
					"@container": "@list",
					"@id": "viade:comments"
				},
				"description": {
					"@id": "schema:description",
					"@type": "xs:string"
				},
				"media": {
					"@container": "@list",
					"@id": "viade:media"
				},
				"name": {
					"@id": "schema:name",
					"@type": "xs:string"
				},
				"points": {
					"@container": "@list",
					"@id": "viade:points"
				},
				"latitude": {
					"@id": "schema:latitude",
					"@type": "xs:double"
				},
				"longitude": {
					"@id": "schema:longitude",
					"@type": "xs:double"
				},

				"rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
				"rdfs": "http://www.w3.org/2000/01/rdf-schema#",
				"schema": "http://schema.org/",
				"viade": "http://arquisoft.github.io/viadeSpec/",
				"xsd": "http://www.w3.org/2001/XMLSchema#"
			},
			"comments": [
			],
			"description": this.description,
			"media": [
			],
			"name": this.name,
			"points": poinstInJson
		};
		return result;
	}

}

export default MyRoute;