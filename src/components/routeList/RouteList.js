import React from 'react';
import RouteCard from './RouteCard';
import RouteManager from "../../model/RouteManager";

const routeListStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: "2%"
};



class RouteList extends React.Component {

    constructor() {
        super();
        this.routeManager = new RouteManager();
    }


    render() {
       return(
           <div className="App-header">
                <h1>Route list</h1>
                <div style={routeListStyle}>
                    {this.routeManager.getRoutes().map( r =>
                    <RouteCard
                        route={r}
                    />
                    )}
                </div>
           </div>
       );}

}


export default RouteList;