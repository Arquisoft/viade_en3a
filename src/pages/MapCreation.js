import '../App.css';
import EditableMap from '../components/editableMap/EditableMap';
import React, { Component } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import MyRoute from "./../model/MyRoute";

class MapCreation extends Component {

	constructor(props) {
		super(props);
		this.routeName = React.createRef();
		this.points = React.createRef();
		this.routeManager = props.routeManager;
		this.tempRoute = undefined;
	}

	render() {
		return (
			<div className="App-header" style={{ height: "80%" }} >
				<h1>Create your own Route</h1>
				<InputGroup className="mb-3" style={{ width: "50vw" }}>
					<InputGroup.Prepend>
						<InputGroup.Text id="basic-addon1">Route Name</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						ref={this.routeName}
						aria-describedby="basic-addon1"
						role='title'
					/>
				</InputGroup>
				<EditableMap ref={this.points} role='map' />
				<Button variant="primary" onClick={() => this.downloadToClient()} style={{ margin: "1.5vh" }}>Save as json file</Button>
				<Button variant="primary" onClick={() => this.uploadToPod()} style={{ margin: "1.5vh" }}>Upload To Pod</Button>
				<input id="pictureUploader" type="file" name="file" onChange={this.onChangeHandler} />
			</div>
		);
	}

	createRoute() {
		let name = this.routeName.current.value;
		let waypoints = this.points.current.state.points;
		let memoiser = this.routeManager.getMemoiser();
		let route = new MyRoute(name, "Temp author", "Temp description", waypoints, memoiser);
		return route;
	}

	checkRouteChanged(newRoute) {
		if ((this.tempRoute === undefined) || (JSON.stringify(this.tempRoute.toJsonLd()) !== JSON.stringify(newRoute.toJsonLd()))) {
			this.tempRoute = newRoute;
			this.routeManager.addRoute(this.tempRoute);
		}
	}

	downloadToClient() {
		let route = this.createRoute();
		this.checkRouteChanged(route);
		const fileData = JSON.stringify(route.toJsonLd());
		const blob = new Blob([fileData], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.download = route.getAuthor() + "_" + route.toJsonLd()["name"] + ".json";
		link.href = url;
		link.click();
	}

	uploadToPod() {
		let route = this.createRoute();
		this.checkRouteChanged(route);
		const fileData = JSON.stringify(route.toJsonLd());
	}

	async viewRoutes() {
		// let routes = await store.getRoutes();
		// do something with routes
	}

}

export default MapCreation;