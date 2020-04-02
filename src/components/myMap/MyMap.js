import React from 'react';
import { Map, TileLayer, Marker, Polyline, FeatureGroup } from 'react-leaflet';

import "./../../css/MyMap.css";

class MyMap extends React.Component {

	constructor(props) {
		super();
		this.map = React.createRef();
		this.route = props.route;
	}

	setPositionScaled = (e) => {
		this.map.current.leafletElement.fitBounds(e.target.getBounds());
	}

	render() {
		let points = [];
		this.route.getPoints().forEach((waypoint) => {
			points.push([waypoint.getLatitude(), waypoint.getLongitude()]);
		});
		return (
			<Map ref={this.map} center={[0, 0]} zoom={this.props.zoom} dragging={false}
				scrollWheelZoom={false} touchZoom={false} zoomControl={false}
				doubleClickZoom={false} style={this.props.style}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
				<FeatureGroup onAdd={this.setPositionScaled} >
					<Polyline positions={points} color='red' />
					<Marker position={points[0]} />
					<Marker position={points[points.length - 1]} />
				</FeatureGroup>
			</Map>
		);
	}
}

export default MyMap;
