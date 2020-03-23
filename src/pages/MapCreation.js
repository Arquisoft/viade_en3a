import '../App.css';
import EditableMap from '../components/editableMap/EditableMap';
import React, { Component } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import StorageHandler from "../components/podService/storageHandler";
import RouteCreator from "../model/RouteCreator";

class MapCreation extends Component {

	constructor(props) {
		super(props);
		this.routeName = React.createRef();
		this.points = React.createRef();
		this.routeManager=props.routeManager;
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
				<Button variant="primary" onClick={() => this.save()} style={{ margin: "1.5vh" }}>Save as json file</Button>
				<Button variant="primary" onClick={() => this.uploadToPod()} style={{ margin: "1.5vh" }}>Upload To Pod</Button>
				<Button variant="primary" onClick={() => this.viewRoutes()} style={{ margin: "1.5vh" }}>View Pod</Button>
			</div>
		);
	}

	save() {
		const route = new RouteCreator().createRoute(this.routeName.current.value,this.points.current.getPoints());
		this.routeManager.addRoute(route);

		const jsonData = {
			routeName: this.routeName.current.value,
			coordinates: this.points.current.getPoints()
		};
		const fileData = JSON.stringify(jsonData);
		const blob = new Blob([fileData], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.download = jsonData['routeName'] + ".json";
		link.href = url;
		link.click();
	}

	uploadToPod() {
		const jsonData = {
			routeName: this.routeName.current.value,
			coordinates: this.points.current.getPoints()
		};
		const fileData = JSON.stringify(jsonData);
		new StorageHandler().storeFileAtUrl(null, this.routeName.current.value + ".json", fileData);
	}

	async viewRoutes() {
		let store = new StorageHandler();
		let routes = await store.getRoutes();
		// do something with routes
	}
}

export default MapCreation;