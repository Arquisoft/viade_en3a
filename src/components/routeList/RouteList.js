import React from 'react';
import RouteCard from './RouteCard';

const routeListStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: "2%"
};



class RouteList extends React.Component {

    constructor(props) {
        super(props);
        this.routeManager = props.routeManager;
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