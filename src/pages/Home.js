import './../css/App.css';
import React, { Component } from 'react';
import viadeLogo from './../assets/logo/logo_full.jpeg';
import { Translation } from 'react-i18next';
import UserDetails from "../model/Util";


class Home extends Component {

    render() {
        return (
            <div className="App-header" onLoad={() => this.printName()}>
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
        name.appendChild(document.createTextNode(await UserDetails.getName() + ","));
    }

}

export default Home;