import React from "react";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";

export default function RouteCreationForm(props) {
    return (
        <div id="routeCreationFormDiv" style={{ padding: "0% 10%" }}>
            <Form>
                <Form.Group as={Row} controlId="routeNameField" >
                    <Col sm={2}>
                        <Form.Label>Route name:</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control
                            placeholder="Type in route name"
                            ref={props.routeNameRef}
                            role="name"
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="routeDescriptionField" >
                    <Col sm={2}>
                        <Form.Label>Route description:</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control
                            as={"textarea"}
                            placeholder="An optional description of the route"
                            ref={props.routeDescriptionRef}
                            role="description"
                            rows={3}
                        />
                    </Col>
                </Form.Group>
            </Form>
        </div >
    );
}