import './../css/App.css';
import React, { Component } from 'react';
import profileImg from './../assets/profile/profile_img.png';
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
                <ProfileCard profileName="No info available"
                />
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
                <h3 id="profile">No info available</h3>
                <Translation>
                    {
                        (t) => <h2 style={{ padding: "1%" }}>{t('profileAddress')}</h2>
                    }
                </Translation>
                <h3 id="address">No info available</h3>
                <Translation>
                    {
                        (t) => <h2 style={{ padding: "1%" }}>{t('profileEmail')}</h2>
                    }
                </Translation>
                <h3 id="email">No info available</h3>
                <Translation>
                    {
                        (t) => <h2 style={{ padding: "1%" }}>{t('profilePhone')}</h2>
                    }
                </Translation>
                <h3 id="phone">No info available</h3>
            </div>
        );
    }

    async loadInfo() {

        this.loadName();
        //this.loadAddress();
        //this.loadEmail();
        //this.loadPhone();
    }

    async loadName() {
        var name = await UserDetails.getName();
        if (name !== null){
            $(".card-title.h5").text(name);
        } 
    }

    async loadAddress() {
        var address = $("#address");
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
            $("#email").text(email);
        }
    }

    async loadPhone() {
        var phone = await UserDetails.getPhone();

        if (phone !== undefined){
            $("#phone").text(phone);
        }
    }

}

export default Profile;