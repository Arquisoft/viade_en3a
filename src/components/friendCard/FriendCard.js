import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function FriendCard(props) {
    return (
        <Card text="dark" style={{ width: "20vw", height: "auto", margin: "1%" }}>
            <Card.Header style={{ alignItems: "center", padding: "0" }}>
                <img src={props.friendImage}
                width="170"
                height="170"
                className="d-inline-block align-top"
                alt="Friend profile"/>
            </Card.Header>
            <Card.Body>
                <Card.Title style={{ fontSize: "24px" }}>{props.friendName}</Card.Title>
                <Card.Text style={{ fontSize: "18px" }}>{props.friendUsername}</Card.Text>
                <Button variant="danger">Delete</Button>
            </Card.Body>
        </Card>
    );
}

export default FriendCard;