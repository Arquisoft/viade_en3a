import React from 'react';
import {Table, Button} from 'react-bootstrap';

class PointInfo extends React.Component {

    constructor(props) {
        super(props);
        this.map = props.map;
        this.state = {point: undefined}
    }

    setPoint(newPoint){
        this.setState({point: newPoint});
    }

    remove = () => {
        console.log(this.state.point.index)
        this.map.current.remove(this.state.point.index);
    }

    printPoint(){
        if(this.state.point===undefined){
            return <p>No Point</p>
        }
        else {
         return(

                <tr>
                <td>{this.state.point.index + 1}</td>
                <td>{this.state.point.lat.toFixed(3)}</td>
                <td>{this.state.point.lng.toFixed(3)}</td>
                <td>{this.state.point.name}</td>
                <Button style={{backgroundColor:"red"}} onClick={this.remove}>X</Button>
                </tr> );
        }
    }

    render() {

        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Point</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Name</th>
                            <th>Remove</th>
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
