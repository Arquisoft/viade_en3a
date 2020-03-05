import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const cardStyle = {
    width: "30rem"
};

function RouteCard(props) {
    return (
        <Card style={cardStyle} text="dark">
            <Card.Img variant="bottom" src="" />
            <Card.Body>
                <Card.Title>{props.routeName}</Card.Title>
                <Card.Text>{props.routeDescription}</Card.Text>
                <Button variant="dark">Info</Button>
            </Card.Body>
        </Card>
    );
}

export default RouteCard;