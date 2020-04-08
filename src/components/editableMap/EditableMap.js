import React from 'react';
import { Map, TileLayer, Marker, Polyline } from 'react-leaflet';

class EditableMap extends React.Component {

	constructor() {
		super();
		this.state = { points: [[0, 0]] , editablePosition: [43,-5] , boundingbox: [43,-5,43.1,-4.9] };
		this.initial = true;
	}

	addPoint = (e) => {
		if (this.initial) {
			this.state.points.pop();
			this.initial = false;
		}
		this.state.points.push(e.latlng);
		this.setState({ points: this.state.points.slice() });
	}

	getPoints() {
		return this.state.points.slice();
	}

	updatePoint = (event) => {
		var id = event.target.options.marker_index;
		var newPosition = event.target.getLatLng();
		const { points } = this.state;

		points[id] = newPosition;
		this.setState({ points: points.slice() });
	}

	remove = (event) => {
			var id = event.target.options.marker_index;
			const { points } = this.state;
			points.splice(id, 1);
			this.setState({ points: points.slice() });
	}

	setPositionScaled = (e) => {
		this.map.current.leafletElement.fitBounds(this.state.boundingbox);
	}

	render() {

		return (

			<Map
				center={this.state.editablePosition}
				zoom={12}
				style={{ width: "50vw", height: "50vh" }}
				onClick={this.addPoint}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>

				<Polyline positions={this.state.points} color='red' />

				{this.state.points.map((position, index) =>
					<Marker
						marker_index={index}
						position={position}
						draggable={true}
						ondrag={this.updatePoint}
						onClick={this.remove}
					>
					</Marker>
				)}
			</Map>

		);
	}
}
export default EditableMap;

