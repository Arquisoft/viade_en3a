import React, { Component } from 'react';
import EditableMap from '../components/editableMap/EditableMap';
import MyRoute from "./../model/MyRoute";
import {Button, InputGroup, FormControl} from 'react-bootstrap';
import { Translation } from 'react-i18next';
import UserDetails from "./../model/Util";

import './../css/App.css';
import SearchBar from "../components/searchBar/SearchBar";

import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class MapCreation extends Component {

	constructor(props) {
		super(props);
		this.routeName = React.createRef();
		this.routeDescription = React.createRef();
		this.map = React.createRef();
		this.routeManager = props.routeManager;
		this.tempRoute = undefined;
	}

	render() {
		return (
			<div id="routeCreationContainer" className="App-header" style={{ height: "80%" }} >
				<ToastContainer
					position={toast.POSITION.TOP_CENTER}
					autoClose={false}
				/>
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
				<SearchBar map={this.map}/>
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


	async createRoute() {
		toast.dismiss();
		let valid = true;
		let name = this.routeName.current.value;
		if (name === '') {
			valid = false;
			toast.error("Name can't be empty");
		}
		let points = this.map.current.state.points;
		if (points.length < 2) {
			valid = false;
			toast.error("Routes must have at least two points");
		}

		if(!valid)
			return undefined;

		let description = this.routeDescription.current.value;
		let route=undefined;
		await UserDetails.getName().then(function(username) {
				route = new MyRoute(name, username, description, points);
			}
		);
		return route;

	}

	checkRouteChanged(newRoute) {
		if ((this.tempRoute === undefined) || ((this.tempRoute.getComparableString() !== newRoute.getComparableString()))) {
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
			if (filePodUrl === null) {
				toast.error("We can't access your POD. Please, review its permissions");
			} else {
				window.location.href = "#routes/list";
			}

		});
	}
}


export default MapCreation;
