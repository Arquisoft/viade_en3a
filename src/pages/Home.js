import './../css/App.css';
import React, { Component } from 'react';
import viadeLogo from './../assets/logo/logo_full.jpeg';
import { Translation } from 'react-i18next';

const auth = require('solid-auth-client');
var session = null;

class Home extends Component {

    render() {
        return (
            <div className="App-header" onLoad={() => this.getName()}>
                <Translation>
                    {
                        (t) => <h1 id="name">{t('homeWelcome')}</h1>
                    }
                </Translation>
                <Translation>
                    {
                        (t) => <h2>{t('homeWelcome2')}</h2>
                    }
                </Translation>
                <img
                    src={viadeLogo}
                    width="280"
                    height="300"
                    className="d-inline-block align-top"
                    alt="Viade logo"
                />
                <h3>V 0.1</h3>
            </div>
        );
    }

    async getName() {
        session = await auth.currentSession();
        var username = session.webId;
        username = username.replace('https://', '');
        username = username.replace('.solid.community/profile/card#me', '');
        document.getElementById("name").innerHTML = "Hi " + username + ",";
    }

}

export default Home;