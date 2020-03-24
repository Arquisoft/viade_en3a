import { v4 as uuid } from "uuid";
import RouteWaypoint from "./RouteWaypoint";

class MyRoute {

	/**
	 * Constructor for new Route objects. Will be represented by an id 
	 * (uuid generation), an array of RouteWaypoint objects holding latitude, 
	 * longitude and altitude, a name, an author and a description.
	 * 
	 * @param {String} name The name of the route.
	 * @param {String} author The creator of the route.
	 * @param {String} description A description of the route.
 	 * @param {Array<RouteWaypoint>} waypoints The list of waypoints of this rule.
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

	}

}

async function processPoints(waypoints) {
	return waypoints.array.reduce(
		(list, point) => list.push(new RouteWaypoint(point.lat, point.lng)), []
	);
}

export default MyRoute;