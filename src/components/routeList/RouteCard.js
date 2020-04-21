import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import MyMap from './../myMap/MyMap';
import $ from "jquery";

class RouteCard extends React.Component {

    constructor(props) {
        super(props);
        this.route = props.route;
        this.state = {
            mapComponent: <MyMap
                route={this.route}
                zoom={12}
                style={{ borderRadius: "5px", margin: "0", height: "100%", width: "100%" }}
            />
        };
    }

    render() {
        return (
            <Card text="dark">
                <Card.Header style={{ minHeight: "100px", height: "300px", padding: "0" }}>
                    <div id={"routeMapDiv-" + this.route.id} style={{ width: "100%", height: "100%", padding: "0" }}>
                        {this.state.mapComponent}
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Title style={{ fontSize: "24px" }}>{this.route.name}</Card.Title>
                    <Card.Text style={{ fontSize: "18px" }}>{this.route.description}</Card.Text>
                    <Button variant="dark" href={`#routes/info/${this.route.id}`}>Info</Button>
                    <Button variant="dark" style={{ margin: "16px" }} href={`#routes/share/${this.route.id}`}>Share</Button>
                </Card.Body>
            </Card >
        );
    }

    update() {
        this.setState({ mapComponent: this.state.mapComponent });
    }

}


export default RouteCard;