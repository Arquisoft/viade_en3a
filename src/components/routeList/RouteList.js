import React from "react";
import RouteCard from "./RouteCard";
import CardDeck from "react-bootstrap/CardDeck";

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
                <h1>Route List</h1>
                {routesForCardDecks}
            </div >
        );
    }

}

export default RouteList;