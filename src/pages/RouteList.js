import React from "react";
import RouteCard from "../components/routeList/RouteCard";
import { CardDeck, Spinner } from "react-bootstrap";
import { Translation } from 'react-i18next';

import PodStorageHandler from "../components/podService/podStoreHandler";
import MyRoute from "../model/MyRoute";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";


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
        this.syncRoutesWithPod().then(() =>
            this.state.spinnerHidden = true
        );
    }

    render() {
        let routesForCardDecks = [];
        let counter = 0;
        while (counter <= this.state.routes.length) {
            routesForCardDecks.push(
                <CardDeck style={{ margin: "2%", width: "100%" }}>
                    {
                        this.state.routes.slice(counter, counter + this.cardDeckSize).map(
                            (r) => <RouteCard route={r} />)
                    }
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
                {this.state.message}
            </div>
        );
    }

    async syncRoutesWithPod() {
        this.routeManager.resetRoutes();
        let routeList = [];
        let session = await auth.currentSession();
        if (session !== null && session !== undefined) {
            let storageHandler = new PodStorageHandler(session);
            storageHandler.getRoutes((rawJsonRoutes, error) => {
                if (rawJsonRoutes === null) {
                    toast.error("We can't access your POD. Please, review its permissions");
                } else {
                    if (rawJsonRoutes.length !== 0) {
                        rawJsonRoutes.forEach((rawRoute) => {
                            let tempRoute = new MyRoute("", "", "", []);
                            tempRoute.modifyFromJsonLd(JSON.parse(rawRoute));
                            routeList.push(tempRoute);
                            this.routeManager.addRoute(tempRoute);
                        });
                        this.setState({ routes: routeList });
                    } else {
                        this.setState({
                            message:
                                <div>
                                    <h3>Oops! We didn't find any route in your POD</h3>
                                    <p>You can move to "Route management >> Create a new route" to add a new route!</p>
                                </div>
                        });
                    }
                }
            });
        }
    }

}

export default RouteList;