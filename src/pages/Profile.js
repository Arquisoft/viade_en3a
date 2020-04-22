import './../css/App.css';
import React, { Component } from 'react';
import profileImg from './../assets/profile/profile_img.png';
import { Button } from 'react-bootstrap';
import { Translation } from 'react-i18next';
import UserDetails from "../model/Util";


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
                <h3 id="locality"></h3>
                <Translation>
                    {
                        (t) => <h2>{t('profileEmail')}</h2>
                    }
                </Translation>
                <h3 id="email"></h3>
                <Translation>
                    {
                        (t) => <h2>{t('profileRole')}</h2>
                    }
                </Translation>
                <h3 id="role"></h3>
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

        this.loadName();
        this.loadEmail();
        this.loadRole();
    }

    async loadName() {
        var name = document.getElementById("username");
        name.appendChild(document.createTextNode(await UserDetails.getName()));
    }

    async loadEmail() {
        var name = document.getElementById("email");
        name.appendChild(document.createTextNode(await UserDetails.getEmail()));
    }

    async loadRole() {
        var name = document.getElementById("role");
        name.appendChild(document.createTextNode(await UserDetails.getRole()));
    }

}

export default Profile;