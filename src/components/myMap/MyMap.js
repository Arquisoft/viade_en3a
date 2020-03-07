import React from 'react';
import { Map, TileLayer, Marker, Popup,Polyline } from 'react-leaflet';
import MyRoute from './MyRoute.js'

class MyMap extends React.Component {
  
  

  render() {
	const position = [this.props.route.points[0][0], this.props.route.points[0][1]]	
	
	return(
		
	
		<Map center={position} zoom={this.props.zoom} style= {{width:'400px', height:'400px'}}>
			
			<TileLayer
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			/>
			
			<Polyline   positions={this.props.route.points} color='red'/>
			
			<Marker position={this.props.route.points[0]}>
				<Popup>Start</Popup>	
			</Marker>
			
			<Marker position={this.props.route.points[this.props.route.points.length-1]}>
				<Popup>End</Popup>
			</Marker>
			
		</Map>
	
	);
  }
}
export default MyMap;

