import ReactDOM from 'react-dom';
import '../App.css';
import EditableMap from '../components/editableMap/EditableMap';
import React, { Component } from 'react';


class MapCreation extends Component {
  render(){ 
	return (
			<div className="App">
				<EditableMap />
			</div>
		);
	}
}



export default MapCreation;