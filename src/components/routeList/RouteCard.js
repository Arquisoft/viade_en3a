import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import MyMap from '../myMap/MyMap';
import MyRoute from '../myMap/MyRoute';
import {HashRouter, Route} from "react-router-dom";
import InfoView from "../../pages/InfoView";

function RouteCard(props) {
    return (
        <HashRouter>
        <Card text="dark" style={{ width: "20vw", height: "auto", margin: "1%" }}>
            <Card.Header style={{ alignItems: "center", padding: "0" }}>
                <MyMap route={new MyRoute(props.routePoints)} zoom={12} style={{ margin: "0" }} />
            </Card.Header>
            <Card.Body>
                <Card.Title style={{ fontSize: "24px" }}>{props.routeName}</Card.Title>
                <Card.Text style={{ fontSize: "18px" }}>{props.routeDescription}</Card.Text>
                <Button variant="dark" href="#routes/info">Info</Button>
            </Card.Body>
            <Route exact path="/routes/info" render={p => <InfoView route={new MyRoute(props.routePoints)} /> } />
        </Card>
        </HashRouter>

    );
}


export default RouteCard;