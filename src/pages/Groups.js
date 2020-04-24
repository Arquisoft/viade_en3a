import './../css/App.css';
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import FriendCard from '../components/friendCard/FriendCard';
import ProfileA from './../assets/friends/friend_profile_A.png';
import ProfileB from './../assets/friends/friend_profile_B.png';
import { Translation } from 'react-i18next';

const routeFriendsStyle = {
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
                    (t) => <h1 style={{ padding: "1%" }}>{t('friendsTitle')}</h1>
                }
            </Translation>
            <Translation>
                {
                    (t) => <h2 style={{ padding: "1%" }}>{t('friendsAdd')}</h2>
                }
            </Translation>
            <Form inline="true" class="forms-inline">
                <Form.Control type="text" placeholder="Friend username" />
                <Button id="addBtn" variant="primary">
                </Button>
            </Form>
            <Translation>
                {
                    (t) => <h2 style={{ paddingTop: "1%" }}>{t('friendsList')}</h2>
                }
            </Translation>
            <div style={routeFriendsStyle}>
                <FriendCard
                    friendImage={ProfileA}
                    friendName="María Rodríguez"
                    friendUsername="marRo"
                />
                <FriendCard
                    friendImage={ProfileB}
                    friendName="Miguel Menéndez"
                    friendUsername="miguelm85"
                />
            </div>
        </div >
        );

    }

}

export default Groups;