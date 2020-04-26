import './../css/App.css';
import React, { Component } from 'react';
import profileImg from './../assets/profile/profile_img.png';
import { Translation } from 'react-i18next';
import UserDetails from "../model/Util";


class Profile extends Component {

    constructor(props) {
        super();
        this.routeManager = props.routeManager;
    }

    render() {
        return (
            <div className="App-FlexCenterColumn" onLoad={() => this.loadInfo()}>
                <Translation>
                    {
                        (t) => <h1 style={{ padding: "1%" }}>{t('profileTitle')}</h1>
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
                        (t) => <h2 style={{ padding: "1%" }}>{t('profileUsername')}</h2>
                    }
                </Translation>
                <h3 id="username"></h3>
                <Translation>
                    {
                        (t) => <h2 style={{ padding: "1%" }}>{t('profileAddress')}</h2>
                    }
                </Translation>
                <h3 id="address"></h3>
                <Translation>
                    {
                        (t) => <h2 style={{ padding: "1%" }}>{t('profileEmail')}</h2>
                    }
                </Translation>
                <h3 id="email"></h3>
                <Translation>
                    {
                        (t) => <h2 style={{ padding: "1%" }}>{t('profilePhone')}</h2>
                    }
                </Translation>
                <h3 id="phone"></h3>
                <Translation>
                    {
                        (t) => <h1 style={{ padding: "1%" }}>{t('profileLastRoutes')}</h1>
                    }
                </Translation>
            </div>
        );
    }

    async loadInfo() {

        this.loadName();
        this.loadAddress();
        this.loadEmail();
        this.loadPhone();
    }

    async loadName() {
        var name = document.getElementById("username");
        name.appendChild(document.createTextNode(await UserDetails.getName()));
    }

    async loadAddress() {
        var role = document.getElementById("address");
        role.appendChild(document.createTextNode(await UserDetails.getLocality()));
        role.appendChild(document.createTextNode(", "));
        role.appendChild(document.createTextNode(await UserDetails.getRegion()));
    }

    async loadEmail() {
        var email = document.getElementById("email");
        email.appendChild(document.createTextNode(await UserDetails.getEmail()));
    }

    async loadPhone() {
        var phone = document.getElementById("phone");
        phone.appendChild(document.createTextNode(await UserDetails.getPhone()));
    }

}

export default Profile;