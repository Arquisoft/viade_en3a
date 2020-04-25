import './../css/App.css';
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import FriendCard from '../components/friendCard/FriendCard';
import ProfileA from './../assets/friends/friend_profile_A.png';
import { Translation } from 'react-i18next';

const groupsStyle = {
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: "2%"
};

class Groups extends Component {

    render() {
        return (
            <div className="App-FlexCenterColumn">
            <Translation>
                {
                    (t) => <h1 style={{ padding: "1%" }}>{t('groupsTitle')}</h1>
                }
            </Translation>
            <Translation>
                    {
                        (t) => <Button variant="primary" size="lg" href="#createGroup" 
                        style={{ margin: "2vh" }}>{t('groupsCreate')}</Button>
                    }
            </Translation>
            <div style={groupsStyle}>
                <FriendCard
                    friendImage={ProfileA}
                    friendName="María Rodríguez"
                    friendLink="https://www.google.es"
                />
            </div>
        </div >
        );

    }

}

export default Groups;