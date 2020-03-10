import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import MyMap from '../myMap/MyMap';
import MyRoute from '../myMap/MyRoute';

const cardStyle = {
    width: "30rem"
};

function RouteCard(props) {
    return (
        <Card style={cardStyle} text="dark">
            {/* <Card.Img variant="bottom" src="" /> */}
            <Card.Header>
                <MyMap route={new MyRoute(props.routePoints)} zoom={13} />
            </Card.Header>
            <Card.Body>
                <Card.Title>{props.routeName}</Card.Title>
                <Card.Text>{props.routeDescription}</Card.Text>
                <Button variant="dark">Info</Button>
            </Card.Body>
        </Card>
    );
}

export default RouteCard;