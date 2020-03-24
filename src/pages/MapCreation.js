import '../App.css';
import EditableMap from '../components/editableMap/EditableMap';
import React, { Component } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import StorageHandler from "../components/podService/storageHandler";
import MyRoute from "./../model/MyRoute";

class MapCreation extends Component {

	constructor(props) {
		super(props);
		this.routeName = React.createRef();
		this.points = React.createRef();
		this.routeManager = props.routeManager;
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
				<Button variant="primary" onClick={() => downloadToClient()} style={{ margin: "1.5vh" }}>Save as json file</Button>
				<Button variant="primary" onClick={() => uploadToPod()} style={{ margin: "1.5vh" }}>Upload To Pod</Button>
				<Button variant="primary" onClick={() => viewRoutes()} style={{ margin: "1.5vh" }}>View Pod</Button>
			</div>
		);
	}

	async viewRoutes() {
		let store = new StorageHandler();
		let routes = await store.getRoutes();
		// do something with routes
	}
}

function createRoute() {
	let route = new MyRoute(this.routeName, "Temp author", "Temp description", this.points);
	this.routeManager.addRoute(route);
	return route;
}

function downloadToClient() {
	let route = createRoute();
	const fileData = JSON.stringify(route.toJsonLd());
	const blob = new Blob([fileData], { type: "text/plain" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.download = route.getAuthor() + "_" + route.toJsonLd()["name"] + ".json";
	link.href = url;
	link.click();
}

function uploadToPod() {
	let route = createRoute();
	const fileData = JSON.stringify(route.toJsonLd());
	new StorageHandler().storeFileAtUrl(null, route.getAuthor() + "_" + route.toJsonLd()["name"] + ".json", fileData);
}

export default MapCreation;