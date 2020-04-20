import './../css/App.css';
import React, { Component } from 'react';
import profileImg from './../assets/profile/profile_img.png';
import { Button } from 'react-bootstrap';
import { Translation } from 'react-i18next';
import UserDetails from "../model/Util";

const auth = require('solid-auth-client');
var session = null;

class Profile extends Component {

    constructor(props) {
        super();
        this.routeManager = props.routeManager;
    }

    render() {
        return (
            <div className="App-header" onLoad={() => this.loadInfo()}>
                <Translation>
                    {
                        (t) => <h1>{t('profileTitle')}</h1>
                    }
                </Translation>
                <img
                    src={profileImg}
                    width="180"
                    height="200"
                    className="d-inline-block align-top"
                    alt="Viade logo"
                />
                <Translation>
                    {
                        (t) => <h2>{t('profileUsername')}</h2>
                    }
                </Translation>
                <h3 id="username"></h3>
                <Translation>
                    {
                        (t) => <h2>{t('profileLocality')}</h2>
                    }
                </Translation>
                <h3 id="locality">locality</h3>
                <Translation>
                    {
                        (t) => <Button variant="info" size="lg" href="#editProfile" style={{ margin: "2vh" }}>{t('profileEditButton')}</Button>
                    }
                </Translation>
                <Translation>
                    {
                        (t) => <h1>{t('profileLastRoutes')}</h1>
                    }
                </Translation>
            </div>
        );
    }

    async loadInfo() {
        var name = document.getElementById("username");
        name.appendChild(document.createTextNode(await UserDetails.getName()));
    }

}

export default Profile;