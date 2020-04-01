import React from "react";
import MyMap from "../components/myMap/MyMap";
import MyElevationChart from '../components/myElevationChart/MyElevationChart';
import PodStorageHandler from "./../components/podService/podStoreHandler";
import MyRoute from "./../model/MyRoute";
import Table from 'react-bootstrap/Table';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Translation } from 'react-i18next';

import logo1 from "../assets/logo/logo.jpeg";
import logo2 from "../assets/logo/logo_alt.jpeg";

import "./../css/infoView.css";

const auth = require('solid-auth-client');

class InfoView extends React.Component {

    constructor(props) {
        super();
        this.id = props.match.params.id;
        this.routeManager = props.routeManager;
        this.state = {
            route: this.routeManager.getRouteById(this.id)
        };
        this.fetchRouteIfNecessary();
    }

    render() {
        if (this.state.route !== undefined) {
            return (
                <div id="routeInfoContainer">
                    <Translation>
                        {
                            (t) => <h1>{t('infoViewTitle')}</h1>
                        }
                    </Translation>
                    <div id="routeInfoContent">
                        <div id="ircInfoTable">
                            <Translation>
                                {
                                    (t) => <Button variant="primary" onClick={() => this.downloadToClient()} style={{ margin: "2%" }}>{t('infoViewExportJSON')}</Button>
                                }
                            </Translation>
                            <div>
                                <Table striped bordered>
                                    <thead>
                                        <tr>
                                            <Translation>
                                                {
                                                    (t) => <th>{t('infoViewTh1')}</th>
                                                }
                                            </Translation>
                                            <Translation>
                                                {
                                                    (t) => <th>{t('infoViewTh2')}</th>
                                                }
                                            </Translation>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <Translation>
                                                {
                                                    (t) => <td>{t('infoViewTd1')}</td>
                                                }
                                            </Translation>
                                            <td>{this.state.route.getName()}</td>
                                        </tr>
                                        <tr>
                                            <Translation>
                                                {
                                                    (t) => <td>{t('infoViewTd2')}</td>
                                                }
                                            </Translation>
                                            <td>{this.state.route.getAuthor()}</td>
                                        </tr>
                                        <tr>
                                            <Translation>
                                                {
                                                    (t) => <td>{t('infoViewTd3')}</td>
                                                }
                                            </Translation>
                                            <td>{this.state.route.getDescription()}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div>
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Translation>
                                            {
                                                (t) => <Form.Label>{t('infoViewComments')}</Form.Label>
                                            }
                                        </Translation>
                                        <Translation>
                                            {
                                                (t) => <Form.Control as="textarea" rows="3" placeholder={t('infoViewWriteComments')} />
                                            }
                                        </Translation>
                                    </Form.Group>
                                    <Translation>
                                        {
                                            (t) => <Button variant="primary" type="submit"> {t('infoViewSubmit')} </Button>
                                        }
                                    </Translation>
                                </Form>
                            </div>
                        </div>
                        <div id="ircTabs">
                            <Tabs>
                                <Translation>
                                    {
                                        (t) => 
                                        <Tab eventKey="routeMap" title={t('infoViewMap')}>
                                            <MyMap route={this.route} zoom={12} style={{ width: "45vw", height: "50vh", margin: "0" }} />
                                        </Tab>
                                    }
                                </Translation>
                                <Translation>
                                    {
                                        (t) =>
                                        <Tab eventKey="elevationChart" title={t('infoViewElevation')}>
                                            <MyElevationChart route={this.route} style={{ width: "100%" }} />
                                        </Tab>
                                    }
                                </Translation>
                                <Translation>
                                    {
                                        (t) =>
                                        <Tab eventKey="imageCarousel" title={t('infoViewImg')}>
                                            <Carousel>
                                                <Carousel.Item>
                                                    <Image src={logo1} fluid />
                                                </Carousel.Item>
                                                <Carousel.Item>
                                                    <Image src={logo2} fluid />
                                                </Carousel.Item>
                                            </Carousel>
                                        </Tab>
                                    }
                                </Translation>
                            </Tabs>
                        </div>
                    </div>
                    <div id="routeCommentsList">
                    </div>
                </div >
            );
        } else {
            return (
                <div id="routeInfoContainer">
                     <Translation>
                        {
                            (t) => <h1>{t('infoViewTitle')}</h1>
                        }
                    </Translation>
                </div >
            );
        }
    }

    downloadToClient() {
        const fileData = this.state.route.toJsonLd();
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = this.state.route.getName() + "_" + this.state.route.getId() + ".json";
        link.href = url;
        link.click();
    }

    async fetchRouteIfNecessary() {
        if (this.id !== undefined && this.routeManager.getRoutes().length === 0 && this.state.route === undefined) {
            let session = await auth.currentSession();
            if (session !== null && session !== undefined) {
                let storageHandler = new PodStorageHandler(session);
                storageHandler.getRoutes((rawJsonRoutes, error) => {
                    if (rawJsonRoutes === null) {
                        alert("There was an error trying to show the information for this route");
                    } else {
                        let routeToInfoString = rawJsonRoutes.filter((routeString) => { return routeString.includes(this.id); });
                        let tempRoute = new MyRoute("", "", "", []);
                        tempRoute.modifyFromJsonLd(routeToInfoString);
                        this.setState({ route: tempRoute });
                    }
                });
            }
        }
    }

}

export default InfoView;