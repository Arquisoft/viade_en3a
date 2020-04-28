import React from 'react';
import { Form, Row, Col, Button } from "react-bootstrap";
import { search } from "nominatim";
import { toast } from "react-toastify";
import i18n from '../../i18n';

import 'react-toastify/dist/ReactToastify.css';
import {useTranslation} from "react-i18next";

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.map = props.map;
        this.search = React.createRef();
    }

    handleEnter = (event) => {
        if (event.charCode === 13) {
            event.preventDefault();
            this.lookFor(this.search.current.value);
        }
    };

    lookFor(text) {
        toast.dismiss();
        if (this.search.current.value.length === 0) {
            toast.error(i18n.t("alertNoInputOnSearch"));
        } else {
            toast.info(i18n.t("searching"));

            search({ q: text }, function (err, opts, results) {
                if (results.length > 0) {
                    let firstFound = results[0];

                    this.map.current.setState({ editablePosition: [firstFound.lat, firstFound.lon] });
                    this.map.current.setState({ boundingbox: firstFound.boundingBox });

                    this.search.current.value = firstFound.display_name;

                    toast.dismiss();
                    toast.success(i18n.t("mapCreationSearchBarFound") + firstFound.display_name);
                }
                else {
                    this.search.current.value = "";

                    toast.dismiss();
                    toast.error(i18n.t("mapCreationSearchBarError"));
                }

            }.bind(this));
        }
    }


    render() {

        return (
            <div>
                <Form style={{ margin: "1%" }}>
                    <Form.Group as={Row}>
                        <Col sm={2}>
                            <Form.Label>{i18n.t('searchBarLabel')}</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control
                                id="txtSearch"
                                onKeyPress={this.handleEnter}
                                ref={this.search}
                            />
                        </Col>
                        <Col sm={0.5}>
                            <Button
                                id="btnSearch"
                                variant="primary"
                                onClick={() => this.lookFor(this.search.current.value)}
                            ><i className="fa fa-search"></i>
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default SearchBar;

