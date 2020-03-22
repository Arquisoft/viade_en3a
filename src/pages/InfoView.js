import React from "react";
import MyMap from "../components/myMap/MyMap";
import RouteManager from "../model/RouteManager";

class InfoView extends React.Component {

    constructor(props) {
        super();
        this.id = props.match.params.id;
        this.routeManager = new RouteManager();
    }

    render() {
        return (
            <div>
                <h1>Route Info </h1>
                <MyMap route={this.routeManager.getRouteById(this.id)} zoom={12}/>
            </div>		
        );
    }

}

export default InfoView;