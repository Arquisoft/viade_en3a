import '../App.css';
import React, { Component } from 'react';
import profileImg from './../assets/profile/profile_img.png';
import { Button } from 'react-bootstrap';
import RouteCard from '../components/routeList/RouteCard';

const auth = require('solid-auth-client');
var session = null;

const routeListStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: "2%"
};

class Profile extends Component {
    constructor(props) {
        super();
        this.routeManager = props.routeManager;
    }

    render() {
        return (
            <div className="App-header" onLoad={() => this.loadInfo()}>
                <h1>Profile</h1>
                <img
                    src={profileImg}
                    width="180"
                    height="200"
                    className="d-inline-block align-top"
                    alt="Viade logo"
                />
                <h2>Username:</h2>
                <h3 id="username">username</h3>
                <h2>Locality:</h2>
                <h3 id="locality">locality</h3>
                <Button variant="info" size="lg" href="#editProfile" style={{ margin: "2vh" }}>Edit profile</Button>

                <h1>Last routes done</h1>
                <div style={routeListStyle}>
                    <RouteCard
                        route={this.routeManager.getRoutes()[0]}
                    />
                </div>
            </div>

        );
    }

    async loadInfo() {

        session = await auth.currentSession();
        var username = session.webId;
        username = username.replace('https://', '');
        username = username.replace('.solid.community/profile/card#me', '');

        //document.getElementById("name").innerHTML = "Juan Martínez";
        document.getElementById("username").innerHTML = username;
        document.getElementById("locality").innerHTML = "Oviedo, Asturias";
    }

}



export default Profile;