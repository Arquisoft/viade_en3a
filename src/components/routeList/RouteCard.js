import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import MyMap from './../myMap/MyMap';

function RouteCard(props) {
    return (
        <Card text="dark">
            <Card.Header style={{ minHeight: "100px", height: "300px", padding: "0" }}>
                <div style={{ width: "100%", height: "100%", padding: "0" }}>
                    <MyMap route={props.route} zoom={12} style={{ borderRadius: "5px", margin: "0", height: "100%", width: "100%" }} />
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Title style={{ fontSize: "24px" }}>{props.route.name}</Card.Title>
                <Card.Text style={{ fontSize: "18px" }}>{props.route.description}</Card.Text>
                <Button variant="dark" href={`#routes/info/${props.route.id}`}>Info</Button>
                <Button variant="dark" style={{margin:"16px"}}href={`#routes/share/${props.route.id}`}>Share</Button>
            </Card.Body>
        </Card>
    );
}

export default RouteCard;