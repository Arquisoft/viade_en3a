import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import MyMap from '../myMap/MyMap';


function RouteCard(props) {
    return (
        <Card text="dark" style={{ width: "20vw", height: "auto", margin: "1%" }}>
            <Card.Header style={{ alignItems: "center", padding: "0" }}>
                <MyMap route={props.route} zoom={12} style={{ margin: "0" }} />
            </Card.Header>
            <Card.Body>
                <Card.Title style={{ fontSize: "24px" }}>{props.route.name}</Card.Title>
                <Card.Text style={{ fontSize: "18px" }}>{props.route.description}</Card.Text>
                <Button variant="dark" href={`#routes/info/${props.route.id}`}>Info</Button>
            </Card.Body>

        </Card>


    );
}


export default RouteCard;