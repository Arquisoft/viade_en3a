import React from "react";
import MyMap from "../components/myMap/MyMap";

class InfoView extends React.Component {

    render() {
        console.log("entered2")
        return (
            <div  >
                <h1>Route Info</h1>
                <MyMap route={this.props.route}></MyMap>
            </div>
        );
    }

}

export default InfoView;