import React from "react";
import MyMap from "../components/myMap/MyMap";
import {Table} from 'react-bootstrap';
import MyElevationChart from '../components/myElevationChart/MyElevationChart'


class InfoView extends React.Component {

    constructor(props) {
        super();
        this.id = props.match.params.id;
        this.routeManager = props.routeManager;
        this.route=this.routeManager.getRouteById(this.id);
    }

    render() {
        return (
            <div style={{ display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems: "center"}}>

                <h1>Route Info </h1>

                <img src={this.route.imageSource} alt="routeImage"/>

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Info</th>
                        <th>Data</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Name:</td>
                        <td>{this.route.name}</td>
                    </tr>
                    <tr>
                        <td>Author:</td>
                        <td>{this.route.author}</td>
                    </tr>
                    <tr>
                        <td>Description:</td>
                        <td>{this.route.description}</td>
                    </tr>
                    </tbody>
                </Table>

                <MyMap route={this.route} zoom={12} style={{ width: "19.5vw", height: "15vw", margin:"0"}} />

                <MyElevationChart route={this.route} style={{heigth: "auto", width: "50%"}} />

            </div>		
        );
    }

}

export default InfoView;