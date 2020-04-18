import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function RouteCreationForm(props) {
    return (
        <div id="routeCreationFormDiv" style={{ padding: "0% 10% 0% 5%" }}>
            <Form>
                <Form.Group as={Row}>
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
                <Form.Group as={Row}>
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
                <Form.Group as={Row}>
                    <Col sm={2}>
                        <Form.Label>File upload:</Form.Label>
                    </Col>
                    <Col>
                        <div className="input-group">
                            <div className="custom-file">
                                <label className="custom-file-label" htmlFor="routeFileUpload">
                                    You can upload more than one file
                                </label>
                                <input
                                    id="routeFileUpload"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="custom-file-input"
                                />
                            </div>
                        </div>
                    </Col>
                </Form.Group>
            </Form >
        </div >
    );
}