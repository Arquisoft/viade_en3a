import ReactDOM from 'react-dom';
import '../App.css';
import EditableMap from '../components/editableMap/EditableMap';
import React, { Component } from 'react';
import {Button, InputGroup, FormControl} from 'react-bootstrap';
import 'URL';


class MapCreation extends Component {
	constructor() {
		super();
		this.routeName = React.createRef();
		this.points = React.createRef();
	}
	
  render(){ 
	return (
			<div className="App">
				<h1>Create your own Route</h1>
				<EditableMap ref={this.points} role='map'  />
				
				<InputGroup className="mb-3">
					<InputGroup.Prepend>
						<InputGroup.Text id="basic-addon1">Route Name</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						ref={this.routeName}
						aria-describedby="basic-addon1"
						role='title'
					/>
				</InputGroup>
				<Button variant="primary" onClick={() => this.save()}  >Save</Button>
			</div>
			
		);
	}
	
	save(){
		const jsonData={
			routeName : this.routeName.current.value,
			coordinates: this.points.current.getPoints()
		};
		const fileData = JSON.stringify(jsonData);
		const blob = new Blob([fileData], {type: "text/plain"});
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.download = jsonData['routeName']+".json";
		link.href = url;
		link.click();
		
	}

}



export default MapCreation;