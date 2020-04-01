import React from "react";
import RouteCard from "./RouteCard";
import CardDeck from "react-bootstrap/CardDeck";
import { Translation } from 'react-i18next';

import PodStorageHandler from "./../podService/podStoreHandler";
import MyRoute from "./../../model/MyRoute";

const auth = require('solid-auth-client');

class RouteList extends React.Component {
    
    constructor(props) {
        super(props);
        this.routeManager = props.routeManager;
        this.cardDeckSize = 4;
        this.state = {
            routes: []
        };
        this.syncRoutesWithPod();
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
            <div className="App-header">
                <Translation>
                    {
                        (t) => <h1>{t('routeListText')}</h1>
                    }  
                </Translation>
                {routesForCardDecks}
            </div >
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
                    alert("There was an error trying to fetch your routes from the POD");
                } else {
                    rawJsonRoutes.forEach((rawRoute) => {
                        let tempRoute = new MyRoute("", "", "", []);
                        tempRoute.modifyFromJsonLd(rawRoute);
                        routeList.push(tempRoute);
                        this.routeManager.addRoute(tempRoute);
                    });
                }
                this.setState({ routes: routeList });
            });
        }
    }

}

export default RouteList;