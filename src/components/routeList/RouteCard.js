import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function RouteCard(props) {
    return (
        <Card style={cardStyle} text="dark">
            <Card.Img variant="bottom" src="" />
            <Card.Body>
                <Card.Title>{props.routeName}</Card.Title>
                <Card.Text>{props.routeDescription}</Card.Text>
                <Button variant="primary">Info</Button>
            </Card.Body>
        </Card>
    );
}

const cardStyle = {
    width: "30rem"
}

export default RouteCard;