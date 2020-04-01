import React from "react";
import RouteCard from "./RouteCard";
import CardDeck from "react-bootstrap/CardDeck";
import { Translation } from 'react-i18next';

class RouteList extends React.Component {
    
    constructor(props) {
        super(props);
        this.routeManager = props.routeManager;
        this.cardDeckSize = 4;
    }
    
    render() {
        let routes = this.routeManager.getRoutes();
        let routesForCardDecks = [];
        let counter = 0;
        while (counter <= routes.length) {
            routesForCardDecks.push(
                <CardDeck style={{ margin: "2%", width: "100%" }}>
                    {
                        routes.slice(counter, counter + this.cardDeckSize).map(
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
                        (t, { i18n }) => <h1>{t('routeListText')}</h1>
                    }  
                </Translation>
                {routesForCardDecks}
            </div >
        );
    }

}

export default RouteList;