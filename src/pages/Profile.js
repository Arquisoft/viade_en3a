import './../css/App.css';
import React, { Component } from 'react';
import viadeLogo from './../assets/logo/logo_old.jpeg';
import { Translation } from 'react-i18next';
import UserDetails from "../model/Util";
import $ from "jquery";
import ProfileCard from '../components/friendCard/ProfileCard';

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
                <ProfileCard 
                    profileLink="No info available"
                    profileImage="Not loaded"
                />
                <img
                    src={viadeLogo}
                    width="150"
                    height="150"
                    className="align-top"
                    alt="Viade logo"
                />
            </div>
        );
    }

    async loadInfo() {

        this.loadName();
        this.loadAddress();
        this.loadEmail();
        this.loadSolidProfile();
        this.loadImage();
    }

    async loadName() {
        var name = await UserDetails.getName();
        if (name !== null){
            $(".card-title.h5").text(name);
        } 
    }

    async loadAddress() {
        var address = $(".card-subtitle.h6");
        var locality = await UserDetails.getLocality();
        var region = await UserDetails.getRegion();

        if (locality !== undefined){
            address.text(locality);
            if (region !== undefined){
                address.text(locality + ", " + region);
            }
        } else if (region !== undefined){
            address.text(region);
        }
    }

    async loadEmail() {
        var email = await UserDetails.getEmail();

        if (email !== undefined){
            $(".card-text").text(email);
        }
    }

    async loadSolidProfile() {
        var link = await UserDetails.getSolidProfile();
        if (link !== null){
            $(".btn.btn-solid").attr("href",link);
        } 
    }

    async loadImage(){
        var img = await UserDetails.getImage();
        if (img !== null){
            $(".d-inline-block.align-top").attr("src",img);
        } 
    }

}

export default Profile;