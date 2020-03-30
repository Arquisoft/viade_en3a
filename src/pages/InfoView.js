import React from "react";
import MyMap from "../components/myMap/MyMap";
import MyElevationChart from '../components/myElevationChart/MyElevationChart';
import Table from 'react-bootstrap/Table';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import logo1 from "../assets/logo/logo.jpeg";
import logo2 from "../assets/logo/logo_alt.jpeg";

import "./../css/infoView.css";

class InfoView extends React.Component {

    constructor(props) {
        super();
        this.id = props.match.params.id;
        this.routeManager = props.routeManager;
        this.route = this.routeManager.getRouteById(this.id);
    }

    render() {
        return (
            <div id="routeInfoContainer">
                <h1>Route Info</h1>
                <div id="routeInfoContent">
                    <div id="ircInfoTable">
                        <Button variant="primary" onClick={() => this.downloadToClient()} style={{ margin: "2%" }}>Export route in json format</Button>
                        <div>
                            <Table striped bordered>
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
                        </div>
                        <div>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Comment section</Form.Label>
                                    <Form.Control as="textarea" rows="3" placeholder="Write your comment here" />
                                </Form.Group>
                                <Button variant="primary" type="submit"> Submit </Button>
                            </Form>
                        </div>
                    </div>
                    <div id="ircTabs">
                        <Tabs>
                            <Tab eventKey="routeMap" title="Map view">
                                <MyMap route={this.route} zoom={12} style={{ width: "45vw", height: "50vh", margin: "0" }} />
                            </Tab>
                            <Tab eventKey="elevationChart" title="Elevation chart">
                                <MyElevationChart route={this.route} style={{ width: "100%" }} />
                            </Tab>
                            <Tab eventKey="imageCarousel" title="Image gallery">
                                <Carousel>
                                    <Carousel.Item>
                                        <Image src={logo1} fluid />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <Image src={logo2} fluid />
                                    </Carousel.Item>
                                </Carousel>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                <div id="routeCommentsList">
                </div>
            </div >
        );
    }

    downloadToClient() {
        const fileData = this.route.toJsonLd();
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = this.route.getName() + "_" + this.route.getId() + ".json";
        link.href = url;
        link.click();
    }

}

export default InfoView;