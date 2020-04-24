import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { CardDeck, Spinner } from "react-bootstrap";
import { Translation } from 'react-i18next';

import PodStorageHandler from "../components/podService/podStoreHandler";
import RouteCard from "../components/routeList/RouteCard";
import MyRoute from "../model/MyRoute";
import $ from "jquery";

import 'react-toastify/dist/ReactToastify.css';
import RouteManager from "../model/RouteManager";

const auth = require('solid-auth-client');

class RouteList extends React.Component {

    constructor(props) {
        super(props);
        this.routeManager = RouteManager;
        this.cardDeckSize = 4;
        this.state = {
            routes: [],
            sharedRoutes : [],
            spinnerHidden: false,
        };
        if (props.sync == undefined || props.sync == true) {
            this.syncRoutesWithPod().then(() => {
                this.state.spinnerHidden = true;
            });
            this.processedRoutes = 0;
            this.retrievedRoutes = 0;
        }
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

            // Handle my Routes
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
                        this.processedRoutes += 1;
                        if (this.processedRoutes === this.retrievedRoutes) {
                            this.setState({ routes: tempList });
                            $("#messageArea").empty();
                        }
                    }
                }
            }).then(
                (result) => {
                    if (result === 0) {
                        this.setState({
                            message:
                                <div>
                                    <h3>Oops! We didn't find any route in your POD</h3>
                                    <p>You can move to "Route management >> Create a new route" to add a new route!</p>
                                </div>
                        });
                    } else {
                        this.retrievedRoutes = result;
                    }
                }
            );

            // Handle Shared Routes
            storageHandler.getRoutesSharedToMe( (route) => {
                if (route === undefined || route == null) {
                    toast.error("We can't access your POD. Please, review its permissions");
                } else {
                    this.routeManager.addSharedRoute(route);
                    let tempList = this.state.sharedRoutes;
                    tempList.push(route);
                    this.setState({ sharedRoutes: tempList });
                    $("#messageArea").empty();
                }
            });
        }
    }

}

export default RouteList;