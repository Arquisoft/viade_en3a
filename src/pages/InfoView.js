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
import { ToastContainer, toast } from "react-toastify";

import logo1 from "../assets/logo/logo.jpeg";
import logo2 from "../assets/logo/logo_alt.jpeg";

import "./../css/infoView.css";
import i18n from "../i18n";

const auth = require('solid-auth-client');

class InfoView extends React.Component {

    constructor(props) {
        super(props);
        this.id = props.match.params.id;
        this.routeManager = props.routeManager;
        this.state = {
            route: this.routeManager.getAnyRouteById(this.id)
        };
        this.fetchRouteIfNecessary();
    }

    render() {
        if (this.state.route !== undefined) {
            return (
                <div>
                    <ToastContainer
                        id="toastContainer"
                        position={toast.POSITION.TOP_CENTER}
                        autoClose={5000}
                    />
                    <Translation>
                        {
                            (t) => <h1 style={{ padding: "1%" }}>{t('infoViewTitle')}</h1>
                        }
                    </Translation >
                    <div id="routeInfoContainer">
                        <div id="routeInfoContent">
                            <div id="ircInfoTable">
                                <div>
                                    <Table striped bordered style={{ margin: "0%" }}>
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
                                            <tr>
                                                <Translation>
                                                    {
                                                        (t) => <td>{t('infoViewTd4')}</td>
                                                    }
                                                </Translation>
                                                <td>{this.state.route.getRouteLength()}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Translation>
                                        {
                                            (t) => <Button variant="primary" onClick={() => this.downloadToClient()} style={{ margin: "2%" }}>{t('infoViewExportJSON')}</Button>
                                        }
                                    </Translation>
                                </div>
                                <div style={{ marginTop: "2%" }}>
                                    <Form>
                                        <Form.Group>
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
                                                (t) => <Button variant="primary" onClick={() => { toast.info(i18n.t('infoViewCommentsNotYetImplemented')) }} type="submit" > {t('infoViewSubmit')} </Button>
                                            }
                                        </Translation>
                                    </Form>
                                </div>
                            </div>
                            <div id="ircTabs">
                                <Tabs>
                                    <Tab eventKey="routeMap" title="Map view">
                                        <MyMap route={this.state.route} movable={true} zoom={12} style={{ width: "45vw", height: "50vh", margin: "0" }} />
                                    </Tab>
                                    <Tab eventKey="elevationChart" title="Elevation chart">
                                        <MyElevationChart route={this.state.route} style={{ width: "100%" }} />
                                    </Tab>
                                    <Tab eventKey="imageCarousel" title="Image gallery">
                                        {this.getCarousel()}
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                        <div id="routeCommentsList">
                        </div>
                    </div>
                </div >
            );
        } else {
            return (
                <div id="routeInfoContainer">
                    <Translation>
                        {
                            (t) => <h1 style={{ padding: "1%" }}>{t('infoViewTitle')}</h1>
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
                storageHandler.getRoutes((jsonRoute, error) => {
                    if (jsonRoute === null) {
                        toast.error(i18n.t("alertUnableToRetrieveRoute"));
                    } else {
                        if (jsonRoute.includes(this.id)) {
                            let tempRoute = new MyRoute("", "", "", []);
                            tempRoute.modifyFromJsonLd(JSON.parse(jsonRoute));
                            this.setState({ route: tempRoute });
                        }
                    }
                });
            }
        }
    }

    getCarousel() {
        let pics = [];
        this.state.route.media.map((m) => { return m.podURL; }).forEach((url) => {
            pics.push(
                <Carousel.Item key={url}>
                    <Image src={url} fluid />
                </Carousel.Item>)
        });

        // Placeholder
        if (pics.length === 0) {
            pics.push(
                <Carousel.Item key={"logo1"}>
                    <Image src={logo1} fluid />
                </Carousel.Item>
            );
            pics.push(
                <Carousel.Item key={"logo2"}>
                    <Image src={logo2} fluid />
                </Carousel.Item>
            );
        }

        return <Carousel>
            {pics}
        </Carousel>;
    }
}

export default InfoView;