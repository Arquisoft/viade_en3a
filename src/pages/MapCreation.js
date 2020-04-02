import React, { Component } from 'react';
import EditableMap from '../components/editableMap/EditableMap';
import MyRoute from "./../model/MyRoute";
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { Translation } from 'react-i18next';


import './../css/App.css';


class MapCreation extends Component {

	constructor(props) {
		super(props);
		this.routeName = React.createRef();
		this.routeDescription = React.createRef();
		this.points = React.createRef();
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
					<InputGroup.Prepend>
						<InputGroup.Text id="basic-addon1">Route Description</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						ref={this.routeDescription}
						aria-describedby="basic-addon1"
						role='description'
					/>
				</InputGroup>
				<EditableMap ref={this.points} role='map' />
				<Translation>
					{
						(t) => <Button variant="primary" onClick={() => this.uploadToPod()} style={{ margin: "1.5vh" }}>{t('mapCreationSaveButton')}</Button>
					}
				</Translation>
			</div>
		);
	}

	createRoute() {
		let name = this.routeName.current.value;
		if (name === '') {
			alert("Name can't be empty");
			return undefined;
		}
		let points = this.points.current.state.points;
		if (points.length < 2) {
			alert("You should have at least two points");
			return undefined;
		}
		let description = this.routeDescription.current.value;
		if (description === '') {
			alert("Description can not be empty");
			return undefined;
		}
		let route = new MyRoute(name, "Temp author", description, points);
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
		let route = this.createRoute();
		if (route === undefined) {
			return;
		}
		route = this.checkRouteChanged(route);
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
