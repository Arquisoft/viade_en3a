import React from 'react';
import { MDBBtn } from "mdbreact";

import './RouteCardStyle.css';
import './RouteCardLayout.css';

function RouteCard(props) {
    return (
        <div className="routeCardGrid routeCard">
            <header className="routeCardHeader">
                <p className="routeCardTitle">{props.routeName}</p>
                <hr className="horizontalBarSeparator" />
                <MDBBtn color="info" className="routeCardInfoButton">Info</MDBBtn>
            </header>
            <div className="routeCardImage">
                <img src={props.routeImageSource} alt="Route representation" />
            </div>
            <div className="routeCardInfo">
                <p>Creator: {props.routeAuthor}</p>
                <p>Description: {props.routeDescription}</p>
            </div>
        </div>
    );
}

export default RouteCard;