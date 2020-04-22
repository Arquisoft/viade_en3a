import React from 'react';
import { Map, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';

class EditableMap extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			points: [new TempPoint(0,0,0,undefined)],
			editablePosition: [43.354834, -5.851405],
			boundingbox: [43.254834, -5.751405, 43.454834, -5.951405]
		};
		this.initial = true;
		this.onChange = props.onChange;
		this.pointInfo = props.pointInfo;
		this.selected = undefined;
		this.normalIcon = L.icon({
			iconUrl: require("../../assets/mapIcons/iconNormal.svg"),
			iconSize: [64,64],
			iconAnchor: [32, 54],
			popupAnchor: null,
			shadowUrl: null,
			shadowSize: null,
			shadowAnchor: null
		});
		this.selectedIcon = L.icon({
			iconUrl: require("../../assets/mapIcons/iconSelected.svg"),
			iconSize: [64,64],
			iconAnchor: [32, 54],
			popupAnchor: null,
			shadowUrl: null,
			shadowSize: null,
			shadowAnchor: null
		});
	}

	addPoint = (e) => {
		if (this.initial) {
			this.state.points.pop();
			this.initial = false;
		}
		this.state.points.push(new TempPoint(e.latlng.lat,e.latlng.lng,this.state.points.length,undefined,undefined));
		this.setState({ points: this.state.points.slice() });
		this.onChange(this.getPoints());
	};

	getPoints() {
		var returnList = [];
		this.state.points.forEach((tempPoint) => returnList.push({ lat: tempPoint.lat, lng: tempPoint.lng}))
		return returnList;
	}

	updatePointNameDescription(oldPoint,name,description){
		let pointInList = this.state.points.find((p) => p.index===oldPoint.index);
		pointInList.name=name;
		pointInList.description=description;
	}

	updatePoint = (event) => {
		var id = event.target.options.marker_index;
		var newPosition = event.target.getLatLng();
		const { points } = this.state;

		points[id].lat = newPosition.lat;
		points[id].lng = newPosition.lng;

		this.setState({ points: points.slice() });
		this.onChange(this.getPoints());
	};

	remove (point) {
		const { points } = this.state;
		let toRemove = points.find( (p) => p.index===point.index);
		let position = points.indexOf(toRemove);
		points.splice(position, 1);
		this.setState({ points: points.slice() });
		this.onChange(this.getPoints());

		this.pointInfo.current.setPoint(undefined);
		this.selected=undefined;
	}

	setPositionScaled = (e) => {
		this.map.current.leafletElement.fitBounds(this.state.boundingbox);
	}

	showPoint = (e) => {
		const id = e.target.options.marker_index;
		e.target.setIcon(this.selectedIcon);
		this.selected = id;
		this.pointInfo.current.setPoint(Object.assign({},this.state.points[id]));
		this.setState({ points: this.state.points.slice() });
	}

	getIcon(index){

		if(this.selected===index){
			return this.selectedIcon;
		}
		else{
			return  this.normalIcon;
		}
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
						position={{lat: position.lat, lng:position.lng}}
						draggable={true}
						ondrag={this.updatePoint}
						onClick={this.showPoint}
						icon={this.getIcon(index)}
					/>
				)}
			</Map>

		);
	}
}
export default EditableMap;

class TempPoint {

	constructor(lat,lng,index,name,description) {
		this.lat=lat;
		this.lng=lng;
		this.index=index;
		this.name=name;
		this.description=description;
	}
	printLat() {
		return this.lat.toFixed(2);
	}
	printLng() {
		return this.lng.toFixed(2);
	}

	setName(name){
		this.name=name;
	}
	setDescription(description){
		this.description=description;
	}

	toString(){
		return this.lat+" "+this.lng+" "+this.index+" "+this.name;
	}

}