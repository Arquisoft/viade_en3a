import React from 'react';
import { Form, Row, Col, Button, FormControl, InputGroup } from "react-bootstrap";
import { search } from "nominatim";

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
        document.getElementById("destination").innerText = "searching...";

        search({ q: text }, function (err, opts, results) {
            if (results.length > 0) {
                let firstFound = results[0];

                this.map.current.setState({ editablePosition: [firstFound.lat, firstFound.lon] });
                this.map.current.setState({ boundingbox: firstFound.boundingBox });

                document.getElementById("destination").innerText = firstFound.display_name;
            }
            else {
                document.getElementById("destination").innerText = "Not found. Search for another place";
            }

        }.bind(this));
    }


    render() {
        return (
            <div>
                <Form>
                    <Form.Group as={Row} controlId="routeNameField">
                        {(t) => <InputGroup.Text id="basic-addon1">{t('mapCreationName')}</InputGroup.Text>}
                        <Form.Label as={Col} column sm={2}>Route name</Form.Label>
                        <Form.Control
                            as={Col}
                            id="txtSearch"
                            onKeyPress={this.handleEnter}
                            ref={this.search}
                            aria-describedby="basic-addon1"
                        />
                        <Button as={Col} sm={1} id="btnSearch" variant="primary" onClick={() => this.lookFor(this.search.current.value)}>Search</Button>
                    </Form.Group>
                </Form>
                <p id={"destination"}></p>
            </div>
        );
    }
}

export default SearchBar;

