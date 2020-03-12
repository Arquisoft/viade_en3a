import '../App.css';
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import FriendCard from '../components/friendCard/FriendCard';
import ProfileA from './../assets/friends/friend_profile_A.png';
import ProfileB from './../assets/friends/friend_profile_B.png';

const routeFriendsStyle = {
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: "2%"
};

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
}

function Friends() {

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (isLoading) {
            simulateNetworkRequest().then(() => {
                setLoading(false);
            });
        }
    }, [isLoading]);

    const handleClick = () => setLoading(true);

    return (
        <div className="App-header">
            <h1>Friends</h1>
            <h2>Add a friend</h2>
            <Form inline="true" class="forms-inline">
                <Form.Control type="text" placeholder="Friend username" />
                <Button variant="primary" disabled={isLoading}
                    onClick={!isLoading ? handleClick : null}>
                    {isLoading ? 'Adding…' : 'Add'}
                </Button>
            </Form>
            <h2>List of friends</h2>
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
        </div>
    );

}

export default Friends;