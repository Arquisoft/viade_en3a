import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";
import css from './MyMap.css';
import "leaflet/dist/leaflet.css";


class MyMap extends React.Component {
  
  constructor(){
  super();
  this.state = {
    lat: 43.249,
    lng: -5.779,
    zoom: 13,
  }
  }
  

  render() {
	const position = [this.state.lat, this.state.lng]	
	
	
	return(
	
	
		<Map center={position} zoom={this.state.zoom} style= {{width:'400px', height:'400px'}}>
		<TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		/>
		<Marker position={position}>
          <Popup>
            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
          </Popup>
        </Marker>
		
		</Map>
	
	);
  }
}
export default MyMap;