import React from 'react';
import { Form, Row, Col, Button } from "react-bootstrap";
import { search } from "nominatim";
import { toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.map = props.map;
        this.search = React.createRef();
    }

    handleEnter = (event) => {
        if (event.charCode === 13) {
            this.lookFor(this.search.current.value);
        }
    };

    lookFor(text) {
        toast.info("Searching...");

        search({ q: text }, function (err, opts, results) {
            if (results.length > 0) {
                let firstFound = results[0];

                this.map.current.setState({ editablePosition: [firstFound.lat, firstFound.lon] });
                this.map.current.setState({ boundingbox: firstFound.boundingBox });

                toast.dismiss();
                toast.success("mapCreationSearchBarFound " + firstFound.display_name);
            }
            else {
                toast.dismiss();
                toast.error("mapCreationSearchBarError");
            }

        }.bind(this));
    }


    render() {
        return (
            <div>
                <Form style={{ margin: "1%" }}>
                    <Form.Group as={Row} controlId="routeNameField">
                        <Col sm={2}>
                            <Form.Label>Search for a place:</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control
                                id="txtSearch"
                                onKeyPress={this.handleEnter}
                                ref={this.search}
                            />
                        </Col>
                        <Col sm={2}>
                            <Button
                                id="btnSearch"
                                variant="primary"
                                onClick={() => this.lookFor(this.search.current.value)}
                            >Search
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default SearchBar;

