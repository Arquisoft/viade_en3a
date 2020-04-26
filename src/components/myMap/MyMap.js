import React from 'react';
import { Map, TileLayer, Marker, Polyline, FeatureGroup,Popup } from 'react-leaflet';

import "./../../css/MyMap.css";
import L from "leaflet";

class MyMap extends React.Component {

	constructor(props) {
		super();
		this.map = React.createRef();
		this.route = props.route;
		this.movable = props.movable;
		this.normalIcon = L.icon({
			iconUrl: require("../../assets/mapIcons/iconNormal.svg"),
			iconSize: [64,64],
			iconAnchor: [32, 54],
			popupAnchor: [32,0],
			shadowUrl: null,
			shadowSize: null,
			shadowAnchor: null
		});
		this.editedIcon = L.icon({
			iconUrl: require("../../assets/mapIcons/iconEdited.svg"),
			iconSize: [64,64],
			iconAnchor: [32, 54],
			popupAnchor: [0,-40],
			shadowUrl: null,
			shadowSize: null,
			shadowAnchor: null
		});
	}

	setPositionScaled = (e) => {
		this.map.current.leafletElement.fitBounds(e.target.getBounds().pad(0.25));
	}

	getPopup(point){
		if(point.name !== ""){
			if(point.description !== ""){
				return (<Popup><b>{point.name}</b><br/>{point.description}</Popup>);
			}
			else{
				return (<Popup><b>{point.name}</b></Popup>);
			}
		} else{
			if(point.description !== ""){
				return (<Popup>{point.description}</Popup>);
			}
			else{
				return;
			}
		}

	}

	getIcon(point) {
		if(point.name!=="" || point.description!=="") {
			return this.editedIcon;
		} else {
			return this.normalIcon;
		}
	}

	getMarkers(points){
		if(this.movable){
			return (this.route.getPoints().map((point,index) =>
					<Marker marker_index={index}
							position={[point.getLatitude(),point.getLongitude()]}
							icon={this.getIcon(point)}>
						{this.getPopup(point)};
					</Marker>
				));
		}
		else{
			return(
				<React.Fragment>
					<Marker position={points[0]} icon={this.normalIcon}/>
					<Marker position={points[points.length-1]} icon={this.normalIcon}/>
				</React.Fragment>
			);

		}

	}

	render() {
		let points = [];

		this.route.getPoints().forEach((waypoint) => {
			points.push([waypoint.getLatitude(), waypoint.getLongitude()]);
		});


		return (

			<Map ref={this.map} center={[0, 0]} zoom={this.props.zoom} dragging={this.movable}
				scrollWheelZoom={this.movable} touchZoom={this.movable} zoomControl={this.movable}
				doubleClickZoom={this.movable} style={this.props.style}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
				<FeatureGroup onAdd={this.setPositionScaled} >
					{this.getMarkers(points)}
					<Polyline positions={points} color='red' />
				</FeatureGroup>
			</Map>
		);
	}
}

export default MyMap;
