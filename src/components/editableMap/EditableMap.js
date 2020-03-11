import React from 'react';
import { Map, TileLayer, Marker, Polyline } from 'react-leaflet';

class EditableMap extends React.Component {

	constructor() {
		super();
		this.state = { points: [[0, 0]] };
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
		if (event.originalEvent.key === 'Backspace') {
			var id = event.target.options.marker_index;
			const { points } = this.state;
			points.splice(id, 1);
			this.setState({ points: points.slice() });
		}
	}

	render() {
		const position = [43, -5];

		return (
			<Map
				center={position}
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
						onkeydown={this.remove}
					>
					</Marker>
				)}
			</Map>
		);
	}
}
export default EditableMap;

