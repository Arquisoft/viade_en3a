import React, { Component } from 'react';
import EditableMap from '../components/editableMap/EditableMap';
import MyRoute from "./../model/MyRoute";
import {Button, InputGroup, FormControl, ListGroup} from 'react-bootstrap';
import { Translation } from 'react-i18next';
import UserDetails from "./../model/Util";
import {search} from 'nominatim';

import './../css/App.css';

class MapCreation extends Component {

	constructor(props) {
		super(props);
		this.routeName = React.createRef();
		this.routeDescription = React.createRef();
		this.map = React.createRef();
		this.search = React.createRef();
		this.routeManager = props.routeManager;
		this.tempRoute = undefined;
	}

	render() {
		return (
			<div id="routeCreationContainer" className="App-header" style={{ height: "80%" }} >
				<Translation>
					{
						(t) => <h1>{t('mapCreationTitle')}</h1>
					}
				</Translation>
				
				<InputGroup className="mb-3" style={{ width: "50vw" }}>
					<InputGroup.Prepend>
						<Translation>
							{
								(t) => <InputGroup.Text id="basic-addon1">{t('mapCreationName')}</InputGroup.Text>
							}
						</Translation>
					</InputGroup.Prepend>
					<FormControl
						ref={this.routeName}
						aria-describedby="basic-addon1"
						role='title'
					/>
				</InputGroup>
				<InputGroup className="mb-3" style={{ width: "50vw" }}>
					<InputGroup.Prepend>
						<Translation>
							{
								(t) => <InputGroup.Text id="basic-addon1">{t('mapCreationRouteDescription')}</InputGroup.Text>
							}
						</Translation>
					</InputGroup.Prepend>
					<FormControl
						as="textarea"
						ref={this.routeDescription}
						aria-describedby="basic-addon1"
						role='description'
					/>
				</InputGroup>
				<InputGroup className="mb-3" style={{ width: "50vw" }}>
					<InputGroup.Prepend>
						<InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						onKeyPress={this.handleEnter}
						ref={this.search}
						aria-describedby="basic-addon1"
					/>
				</InputGroup>
				<Button variant="primary" onClick={() => this.lookFor(this.search.current.value)} style={{ margin: "1.5vh" }}>Search</Button>
				<p id={"destino"}></p>
				<EditableMap ref={this.map} role='map' />
				<input type="file" id="fileUpload" name="files" multiple/>
				<Translation>
					{
						(t) => <Button variant="primary" onClick={() => this.uploadToPod()} style={{ margin: "1.5vh" }}>{t('mapCreationSaveButton')}</Button>
					}
				</Translation>
			</div>
		);
	}

	handleEnter = (event) => {

		if (event.charCode === 13) {
			this.lookFor(this.search.current.value);
		}
	}

	lookFor(text){
		document.getElementById("destino").innerText = "searching..."
		search({q: text}, function (err,opts,results) {
			if(results.length>0) {
				let coordinates = results[0]['boundingbox'];
				let lat = (parseFloat(coordinates[0]) + parseFloat(coordinates[1])) / 2;
				let lng = (parseFloat(coordinates[2]) + parseFloat(coordinates[3])) / 2;
				this.map.current.setState({editablePosition: [lat, lng]});
				this.map.current.setState({boundingbox: results[0]["boundingbox"]});
				document.getElementById("destino").innerText = results[0]['display_name'];
			}
			else {
				document.getElementById("destino").innerText = "not found";
			}

			}.bind(this));
	}

	async createRoute() {
		let name = this.routeName.current.value;
		if (name === '') {
			alert("Name can't be empty");
			return undefined;
		}
		let points = this.map.current.state.points;
		if (points.length < 2) {
			alert("You should have at least two points");
			return undefined;
		}
		let description = this.routeDescription.current.value;
		let route=undefined;
		await UserDetails.getName().then(function(username) {
				route = new MyRoute(name, username, description, points);
			}
		);
		return route;

	}

	checkRouteChanged(newRoute) {
		if ((this.tempRoute === undefined) || (this.tempRoute !== undefined && (this.tempRoute.getComparableString() !== newRoute.getComparableString()))) {
			this.tempRoute = newRoute;
			this.routeManager.addRoute(this.tempRoute);
			return newRoute;
		} else {
			return this.tempRoute;
		}
	}

	async uploadToPod() {
		let route = await this.createRoute();
		if (route === undefined) {
			return;
		}
		route = this.checkRouteChanged(route);
		document.getElementById("fileUpload").files.forEach( (f) => {route.addMedia(f);});
		await route.uploadToPod((filePodUrl, podResponse) => {
			let alertText = "";
			if (filePodUrl === null) {
				alertText = "We are sorry!! Something went wrong while connecting to your POD";
			} else {
				alertText = "Your fresh new shiny route has been correctly uploaded to your POD";
			}
			alert(alertText);
			window.location.href = "#routes/list";
		});
	}
}

export default MapCreation;
