import '../App.css';
import EditableMap from '../components/editableMap/EditableMap';
import React, { Component } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import RouteCreator from "../model/RouteCreator";
import PodStorageHandler from "../components/podService/podStoreHandler";

const auth = require('solid-auth-client');

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
				<Button variant="primary" onClick={() => this.save()} style={{ margin: "1.5vh" }}>Save as json file</Button>
				<Button variant="primary" onClick={() => this.uploadToPod()} style={{ margin: "1.5vh" }}>Upload To Pod</Button>
				<input id="pictureUploader" type="file" name="file" onChange={this.onChangeHandler}/>
			</div>
		);
	}

	save() {
		const route = new RouteCreator().createRoute(this.routeName.current.value, this.points.current.getPoints());
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

	async uploadToPod() {
		const jsonData = {
			routeName: this.routeName.current.value,
			coordinates: this.points.current.getPoints()
		};
		const fileData = JSON.stringify(jsonData);

		/*
		// Get All routes
		new PodStorageHandler(await auth.currentSession()).getRoutes(function (result) {
			if (result) {
				console.log("TRUE: " + result);
			} else {
				console.log("FALSE: " + result);
			}
		});
		*/

		// Upload route
		new PodStorageHandler(await auth.currentSession()).storeRoute(jsonData.routeName + ".txt", fileData, function (result, response) {
			if (result) {
				//console.log("Route stored at: " + result);
			} else {
				//console.log("Fail: " + response);
			}
		});
		// Upload picture
		let dom = document.getElementById("pictureUploader");
		let picture = dom.files[0];
		if (!(typeof picture === 'undefined')) { // If we have a picture
			let extension = picture.name.split('.').pop();
			new PodStorageHandler(await auth.currentSession()).storeResource(jsonData.routeName + "." + extension, picture, function (result, response) {
				if (result) {
					//console.log("Pic stored at: " + result);
				} else {
					//console.log("Fail: " + response);
				}
			});
		}
	}
}

export default MapCreation;