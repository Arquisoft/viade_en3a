import React from 'react';
import { Map, TileLayer, Marker, Polyline, FeatureGroup } from 'react-leaflet';

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
		return (
			<Map ref={this.map} center={[0, 0]} zoom={this.props.zoom} dragging={false}
				scrollWheelZoom={false} touchZoom={false} zoomControl={false}
				doubleClickZoom={false} style={this.props.style}>
				< TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
				<FeatureGroup onAdd={this.setPositionScaled} >
					<Polyline positions={this.route.points} color='red' />
					<Marker position={this.route.points[0]} />
					<Marker position={this.route.points[this.route.points.length - 1]} />
				</FeatureGroup>
			</Map >
		);
	}
}

export default MyMap;
