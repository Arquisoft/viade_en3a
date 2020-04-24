import './../css/App.css';
import React, { Component } from 'react';
import viadeLogo from './../assets/logo/logo_full.jpeg';
import { Translation } from 'react-i18next';
import UserDetails from "../model/Util";
import PodStorageHandler from "../components/podService/podStoreHandler";

const auth = require('solid-auth-client');

class Home extends Component {

    render() {
        return (
            <div className="App-header" onLoad={() => this.printName()}>
                <Translation>
                    {
                        (t) => {
                            if (this.username)
                                return <h1 id="name">{t('homeWelcome') + this.username + ","}</h1>
                            else
                                return <h1 id="name">{t('homeWelcome')}</h1>
                        }
                    }
                </Translation>
                <Translation>
                    {
                        (t) => <h2>{t('homeWelcome2')}</h2>
                    }
                </Translation>
                <img
                    src={viadeLogo}
                    width="255"
                    height="300"
                    className="d-inline-block align-top"
                    alt="Viade logo"
                />
                <h3>V 1.0</h3>
            </div>
        );
    }

    async printName() {
        var name = document.getElementById("name");
        if (!this.username) this.username = await UserDetails.getName();
        name.appendChild(document.createTextNode(this.username + ","));
    }

}

export default Home;