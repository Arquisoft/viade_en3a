import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import MyMap from './../myMap/MyMap';

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
        this.showShareButton = true;
        if (props.showShareButton !== undefined) {
            this.showShareButton = props.showShareButton;
        }

        this.showInfoButton = true;
        if (props.showInfoButton !== undefined) {
            this.showInfoButton = props.showInfoButton;
        }
    }

    render() {

        let buttons = [
            this.showInfoButton && <Button variant="dark" href={`#routes/info/${this.route.id}`}>Info</Button>,
            this.showShareButton && <Button variant="dark" style={{ margin: "16px" }} href={`#routes/share/${this.route.id}`}>Share</Button>
        ];

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
                    {buttons}
                </Card.Body>
            </Card >
        );
    }

    update() {
        this.setState({ mapComponent: this.state.mapComponent });
    }

    toggleShareButton(){
        this.showShareButton = !this.showShareButton;
    }
}


export default RouteCard;