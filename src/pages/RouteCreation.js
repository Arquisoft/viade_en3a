import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import { Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import { Translation } from 'react-i18next';
import i18n from '../i18n'; 

import EditableMap from '../components/editableMap/EditableMap';
import MyRoute from "../model/MyRoute";
import UserDetails from "../model/Util";
import SearchBar from "../components/routeCreation/SearchBar";
import RouteCreationForm from "../components/routeCreation/RouteCreationForm";
import MyElevationChart from "../components/myElevationChart/MyElevationChart";

import 'react-toastify/dist/ReactToastify.css';
import "./../css/routeCreation.css";
import './../css/App.css';
import PointInfo from "../components/pointInfo/PointInfo";

class RouteCreation extends Component {

	constructor(props) {
		super(props);
		this.routeName = React.createRef();
		this.routeDescription = React.createRef();
		this.map = React.createRef();
		this.elevationChart = React.createRef();
		this.pointInfo = React.createRef();
		this.routeManager = props.routeManager;
		this.tempRoute = undefined;
		this.newRoute = new MyRoute("", "", "", []);
	}


	toggleSpinner() {
		let spinner = document.getElementById("spinner");
		spinner.hidden = !spinner.hidden;
	}

	async createRoute() {
		this.toggleSpinner();
		document.getElementById("btnSave").disabled = true;
		toast.dismiss();
		let valid = true;
		let name = this.routeName.current.value;
		if (name === '') {
			valid = false;
			toast.error(i18n.t('alertName'));
		}
		let points = this.map.current.state.points;
		if (points.length < 2) {
			valid = false;
			toast.error(i18n.t('alertPoints'));
		}

		if (!valid) {
			this.toggleSpinner();
			document.getElementById("btnSave").disabled = false;
			return undefined;
		}

		let description = this.routeDescription.current.value;
		let route = undefined;
		await UserDetails.getName().then(
			function (username) {
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
		document.getElementById("routeFileUpload").files.forEach((f) => { route.addMedia(f); });
		await route.uploadToPod((filePodUrl, podResponse) => {
			if (filePodUrl === null) {
				toast.error(i18n.t('alertAccessPOD'));
			} else {
				this.toggleSpinner();
				window.location.href = "#routes/list";
			}
		});
	}

	render() {
		return (
			<div className="App-Black-LightGray" id="routeCreationContainer" >
				<ToastContainer
					id="toastContainer"
					position={toast.POSITION.TOP_CENTER}
					autoClose={5000}
				/>
				<Translation role="title">
					{(t) => <h1 style={{ padding: "1%" }} role="title">{t('mapCreationTitle')}</h1>}
				</Translation>

				<RouteCreationForm
					routeNameRef={this.routeName}
					routeDescriptionRef={this.routeDescription}
				/>

				<div id="mapPointsContainer" style={{ padding: "1% 0%" }}>
					<div id="mapAndSearch">
						<SearchBar map={this.map} />
						<EditableMap
							ref={this.map}
							pointInfo={this.pointInfo}
							onChange={(points, elevationChart = this.elevationChart) => {
								this.newRoute.updatePoints(points, (updatedPoints, chart = elevationChart) => {
									chart.current.update(updatedPoints);
								});
							}}
						/>
					</div>
					<div id="pointManager">
						<h2 style={{ padding: "3% 1% 2% 1%" }}>Route elevation preview</h2>
						<MyElevationChart style={{ padding: "3% 1% 2% 1%" }} ref={this.elevationChart} route={this.newRoute} />
					</div>
				</div>

				<div style={{margin: "1.5vh"}}>
					<PointInfo map={this.map} ref={this.pointInfo}/>
				</div>

				<div>
					<Translation>
						{(t) =>
							<Button
								id="btnSave"
								variant="primary"
								onClick={() => { this.uploadToPod(); }}
								style={{ margin: "1.5vh" }}
							>{t('mapCreationSaveButton')}
							</Button>
						}
					</Translation>
					<Spinner id={"spinner"} hidden animation="border" />
				</div>
			</div >
		);
	}
}


export default RouteCreation;
