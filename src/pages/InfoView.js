import React from "react";
import MyMap from "../components/myMap/MyMap";
import { Table } from 'react-bootstrap';
import MyElevationChart from '../components/myElevationChart/MyElevationChart';
import MyRoute from "./../model/MyRoute";
import { boldRoutePoints } from "./../components/routeList/Points";

class InfoView extends React.Component {

    constructor(props) {
        super();
        this.routeManager = props.routeManager;
        this.route = new MyRoute(
            "Fuso de la Reina",
            "María santísima",
            "Easy to complete, mostly straight lines. Concrete does its job turning your knees into dust.",
            boldRoutePoints,
            {}
        );
    }

    render() {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>

                <h1>Route Info </h1>

                {/* TODO -> Add Images to the routes */}
                < img src={"https://www.stockvault.net/data/2019/12/21/271997/thumb16.jpg"} alt="routeImage" />

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
                            <td>{this.route.getName()}</td>
                        </tr>
                        <tr>
                            <td>Author:</td>
                            <td>{this.route.getAuthor()}</td>
                        </tr>
                        <tr>
                            <td>Description:</td>
                            <td>{this.route.getDescription()}</td>
                        </tr>
                    </tbody>
                </Table>

                <MyMap route={this.route} zoom={12} style={{ width: "19.5vw", height: "15vw", margin: "0" }} />

                <MyElevationChart route={this.route} style={{ heigth: "auto", width: "50%" }} />

            </div>
        );
    }

}

export default InfoView;