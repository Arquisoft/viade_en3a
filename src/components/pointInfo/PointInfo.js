import React from 'react';
import {Table, Button, FormControl} from 'react-bootstrap';

class PointInfo extends React.Component {

    constructor(props) {
        super(props);
        this.map = props.map;
        this.state = {point: undefined, disabled:true}
        this.nameForm = React.createRef();
        this.descriptionForm = React.createRef();
    }

    setPoint(newPoint){
        this.setState({point: newPoint});
        if(newPoint!==undefined) {
            this.nameForm.current.value = newPoint.name === undefined ? "" : newPoint.name;
            this.descriptionForm.current.value = newPoint.description === undefined ? "" : newPoint.description;
        }
    }

    remove = () => {
        this.map.current.remove(this.state.point);
    };


    save = () => {
        let name = this.nameForm.current.value;
        let desc = this.descriptionForm.current.value;
        this.map.current.updatePointNameDescription(this.state.point,name,desc);
        this.disable();
    };

    disable = () => {
        this.setState({disabled:true});
    };

    enable = () => {
        this.setState({disabled:false});
    };



    isEditing(){
            return(<tr>
                <td>{this.state.point.lat.toFixed(3)}</td>
                <td>{this.state.point.lng.toFixed(3)}</td>
                <td><FormControl ref={this.nameForm} onChange={this.enable}></FormControl></td>
                <td><FormControl ref={this.descriptionForm} onChange={this.enable}></FormControl></td>
                <td><Button onClick={this.save} disabled={this.state.disabled}>Save</Button><Button style={{backgroundColor:"red"}} onClick={this.remove}>X</Button></td>
            </tr>);
    }

    printPoint(){
        if(this.state.point===undefined){
            return <tr><td colSpan={5}>Click over a point to edit it</td></tr>
        }
        else {
         return(this.isEditing());
        }
    }

    render() {

        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.printPoint()}
                    </tbody>
                </Table>
            </div>
        );
    }
}
export default PointInfo;
