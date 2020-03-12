import '../App.css';
import React, { Component } from 'react';
import viadeLogo from './../res/logo/logo_full.jpeg';

const auth = require('solid-auth-client');
var session = null;

class Home extends Component{

	render() {
        return (
            <div className="App-header" onLoad={() => this.getName()}>
                <h1 id="name">Hi,</h1>
                <h2>welcome to</h2>
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

	async getName(){
        session = await auth.currentSession();
        var username = session.webId;
        username = username.replace('https://','');
        username = username.replace('.solid.community/profile/card#me','');
        document.getElementById("name").innerHTML = "Hi "+username+",";
    }
    
}

export default Home;