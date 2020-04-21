import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { CardDeck, Spinner } from "react-bootstrap";
import { Translation } from 'react-i18next';

import PodStorageHandler from "../components/podService/podStoreHandler";
import RouteCard from "../components/routeList/RouteCard";
import MyRoute from "../model/MyRoute";
import $ from "jquery";

import 'react-toastify/dist/ReactToastify.css';

const auth = require('solid-auth-client');

class RouteList extends React.Component {

    constructor(props) {
        super(props);
        this.routeManager = props.routeManager;
        this.cardDeckSize = 4;
        this.state = {
            routes: [],
            spinnerHidden: false
        };
        this.syncRoutesWithPod().then(() => {
            this.state.spinnerHidden = true;
            if (this.state.routes.length === 0) {
                this.setState({
                    message:
                        <div>
                            <h3>Oops! We didn't find any route in your POD</h3>
                            <p>You can move to "Route management >> Create a new route" to add a new route!</p>
                        </div>
                });
            }
        });
        this.processedRoutes = 0;
        this.retrievedRoutes = 0;
    }

    render() {
        let routesForCardDecks = [];
        let counter = 0;
        while (counter <= this.state.routes.length) {
            routesForCardDecks.push(
                <CardDeck style={{ padding: "1% 0% 1% 2%", width: "100%" }}>
                    {this.state.routes.slice(counter, counter + this.cardDeckSize).map(
                        (r) => <RouteCard route={r} />
                    )}
                </CardDeck>
            );
            counter += this.cardDeckSize;
        }

        return (
            <div>
                <ToastContainer
                    position={toast.POSITION.TOP_CENTER}
                    autoClose={5000}
                />
                <Translation>
                    {
                        (t) => <h1 style={{ padding: "1%" }}>{t('routeListText')}</h1>
                    }
                </Translation>
                <Translation>
                    {
                        (t) => <h2 style={{ padding: "1%" }} hidden={this.state.spinnerHidden}>{t('routeListLoadingMessage')}</h2>
                    }
                </Translation>

                <Spinner id={"spinner"} hidden={this.state.spinnerHidden} animation="border" />
                {routesForCardDecks}
                <div id="messageArea">
                    {this.state.message}
                </div>
            </div>
        );
    }

    async syncRoutesWithPod() {
        this.routeManager.resetRoutes();
        let session = await auth.currentSession();
        if (session !== null && session !== undefined) {
            let storageHandler = new PodStorageHandler(session);
            storageHandler.getRoutes((routeJson, error) => {
                if (routeJson === null) {
                    toast.error("We can't access your POD. Please, review its permissions");
                } else {
                    if (routeJson.length !== 0) {
                        let tempRoute = new MyRoute("", "", "", []);
                        tempRoute.modifyFromJsonLd(JSON.parse(routeJson));
                        this.routeManager.addRoute(tempRoute);
                        let tempList = this.state.routes;
                        tempList.push(tempRoute);
                        $("#messageArea").empty();
                        this.processedRoutes += 1;
                        this.setState(
                            { routes: tempList },
                            (routeList = this, rtrR = this.retrievedRoutes, proR = this.processedRoutes) => {
                                if (rtrR === proR) {
                                    routeList.updateMaps();
                                }
                            }
                        );
                    }
                }
            }).then(
                (result) => { this.retrievedRoutes = result; }
            );
        }
    }

    updateMaps() {
        // Here goes the code to execute when all the routes are on the screen
    }

}

export default RouteList;