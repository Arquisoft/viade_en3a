import React from 'react';
import { Map, TileLayer, Marker, Polyline, FeatureGroup } from 'react-leaflet';

class MyMap extends React.Component {
	constructor() {
		super();
		this.map =React.createRef();
	}

	setPositionScaled = (e) => {
		this.map.current.leafletElement.fitBounds(e.target.getBounds());
	}

	render() {
		return (
			<Map ref={this.map} center={[0,0]} zoom={this.props.zoom} dragging={false}
				scrollWheelZoom={false} touchZoom={false} zoomControl={false}
				doubleClickZoom={false} style={{ width: "19.5vw", height: "15vw", margin: "0" }}>
				< TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
				<FeatureGroup onAdd={this.setPositionScaled} >
					<Polyline positions={this.props.route.points} color='red' />
					<Marker position={this.props.route.points[0]}/>
					<Marker position={this.props.route.points[this.props.route.points.length - 1]}/>
				</FeatureGroup>
			</Map >
		);
	}
}

export default MyMap;
