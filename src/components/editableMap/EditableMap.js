import React from 'react';
import { Map, TileLayer, Marker, Popup,Polyline } from 'react-leaflet';
//import Route from './Route.js'

class EditableMap extends React.Component {
  
	constructor() {
		super();
		this.state = {points: [[0,0]]};
		this.initial=true;
	}
	
	addPoint = (e) =>{
		console.log("added"+e.latlng);
		const { points } = this.state;
		if(this.initial){
			points.pop();
			this.initial=false;
		}
		points.push(e.latlng);
		this.setState({points});
		console.log({points});
	}
	
  render() {
	const position = [43, -5]	
	
	return(
		
	
		<Map 
			center={position} 
			zoom={12} 
			style= {{width:'400px', height:'400px'}}
			onClick = {this.addPoint}
		>
			
			<TileLayer
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			/>
			
			{this.state.points.map((position) =>
				<Polyline  positions={this.state.points} color='red'/>
			)}
			
			{this.state.points.map((position) =>
				<Marker 
					position={position} 
					draggable={false} 
					
				></Marker>
			)}
			
		</Map>
	
	);
  }
}
export default EditableMap;

