import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import MyMap from '../myMap/MyMap';
import MyRoute from '../myMap/MyRoute';

function RouteCard(props) {
    return (
        <Card text="dark" style={{ width: "20vw", height: "auto", margin: "1%" }}>
            <Card.Header style={{ alignItems: "center", padding: "0" }}>
                <MyMap route={new MyRoute(props.routePoints)} zoom={13} style={{ margin: "0" }} />
            </Card.Header>
            <Card.Body>
                <Card.Title style={{ fontSize: "24px" }}>{props.routeName}</Card.Title>
                <Card.Text style={{ fontSize: "18px" }}>{props.routeDescription}</Card.Text>
                <Button variant="dark">Info</Button>
            </Card.Body>
        </Card>
    );
}

export default RouteCard;