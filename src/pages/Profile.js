import '../App.css';
import React, { Component } from 'react';
import profileImg from './../assets/profile/profile_img.png';
import { Button } from 'react-bootstrap';
import RouteCard from '../components/routeList/RouteCard';
import { xanasRoutePoints } from '../components/routeList/Points';

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
                        routeName="Las Xanas"
                        routeAuthor="Miguel Menéndez"
                        routeDescription="Really beautiful landscape but not wise to traverse with kids. They might fall off of some cliff."
                        routeImageSource="https://www.senditur.com/multimedia/uploads/images/Rutas/Espa%C3%B1a/Asturias/Ruta%20de%20Las%20Xanas/Ruta_de_Las_Xanas.jpg"
                        routePoints={xanasRoutePoints}
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