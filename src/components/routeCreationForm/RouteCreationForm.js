import React from "react";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";

export default function RouteCreationForm() {
    return (
        <div style={{ padding: "0% 10%" }}>
            <Form>
                <Form.Group as={Row} controlId="routeNameField">
                    <Form.Label column sm={2}>Route name</Form.Label>
                    <Col>
                        <Form.Control placeholder="Type in route name" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="routeDescriptionField">
                    <Form.Label column sm={2}>Route description</Form.Label>
                    <Col>
                        <Form.Control as="textarea" placeholder="An optional description for the route" rows={3} />
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
}