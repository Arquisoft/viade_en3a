import React from "react";
import * as auth from 'solid-auth-client';
import data from '@solid/query-ldflex';
import { Card, CardDeck } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { namedNode } from '@rdfjs/data-model';
import PodPermissionHandler from "../components/podService/podPermissionHandler";
import { toast, ToastContainer } from "react-toastify";
import i18n from '../i18n';
import MyGroup from "../model/MyGroup";
import PodStorageHandler from "../components/podService/podStoreHandler";
import $ from "jquery";

import 'react-toastify/dist/ReactToastify.css';

class ShareView extends React.Component {

    constructor(props) {
        super();
        this.groupManager = props.groupManager;
        this.state = {
            friends: [],
            groups: []
        };
        this.readFriends();
        this.webId = null;
        this.id = props.match.params.id;
    }

    render() {
        /*while (counter <= this.state.groups.length) {
            groups.push(
                <CardDeck style={{ padding: "1% 0% 1% 2%", width: "100%" }}>
                    {this.state.groups.slice(counter, counter + this.cardDeckSize).map(
                        (group) =>
                            <Card style={{ width: '18rem', margin: "10px", color: "black" }}>
                                <Card.Img variant="top" src={friend.image} />
                                <Card.Body>
                                    <Card.Title>{friend.name}</Card.Title>
                                    <Button variant="primary"
                                        onClick={() => { this.send(friend.inbox); }}>Share</Button>
                                </Card.Body>
                            </Card>
                    )}
                </CardDeck>
            );
            counter += this.cardDeckSize;
        }*/

        let friendsCardDeck = this.generateCardDecks(
            this.state.friends,
            4,
            (friend) => {
                return (
                    <Card style={{ width: '18rem', margin: "10px", color: "black" }}>
                        <Card.Img variant="top" src={friend.image} />
                        <Card.Body>
                            <Card.Title>{friend.name}</Card.Title>
                            <Button variant="primary"
                                onClick={() => { this.send(friend.inbox); }}>Share</Button>
                        </Card.Body>
                    </Card>
                );
            }
        );

        return (
            <div className="App-header">
                <ToastContainer
                    position={toast.POSITION.TOP_CENTER}
                    autoClose={5000}
                />
                <h2>Amigos</h2>
                {friendsCardDeck}
                <h2>Grupos</h2>
            </div>
        );
    }

    generateCardDecks(list, cardDeckSize = 4, componentMappingFunction = (n) => { }) {
        let components = [];
        let counter = 0;
        while (counter <= list.length) {
            components.push(
                <CardDeck style={{ padding: "1% 0% 1% 2%", width: "100%" }}>
                    {list.slice(counter, counter + cardDeckSize).map((listItem) => { return componentMappingFunction(listItem) }
                    )}
                </CardDeck>
            );
            counter += cardDeckSize;
        }
        return list;
    }

    async readFriends() {
        let session = await auth.currentSession();
        this.webId = session.webId;
        let friends = [];
        for await (const friend of data.user.friends) {
            const f = {};
            const n = await data[friend].vcard$fn;
            const inbox = await data[friend].inbox;
            const imageLd = await data[friend].vcard_hasPhoto;

            if (imageLd && imageLd.value) {
                f.image = imageLd.value;
            } else {
                f.image = "";
            }

            f.webId = `${friend}`;
            f.name = `${n}`;
            f.inbox = `${inbox}`;
            if (n === undefined) {
                f.name = `${friend}`;
            }
            friends = [...friends, f];
        }
        this.setState({ friends: friends });
    }


    async send(destination) {
        try {
            var message = {};
            message.date = new Date(Date.now());
            message.id = message.date.getTime();
            message.sender = this.webId;
            message.recipient = destination;

            let folder = "viade/routes/";
            message.content = this.getWebIdWithoutProfile() + folder + this.id + ".json";

            message.title = "Check out this route shared to you by " + this.getSessionName();
            message.url = message.recipient + message.id + ".json";

            await this.buildMessage(message);
            toast.success(i18n.t('alertSuccessInPermissions'));
        } catch (e) {
            toast.error(i18n.t('alertErrorInPermissions'));
        }
        this.changePermissions(this.id + ".json", [destination.split("inbox")[0] + "profile/card#me"]);
    }

    async changePermissions(routeName, webIds) {
        let session = await auth.currentSession();
        let perm = new PodPermissionHandler(session);
        await perm.shareRouteAndResources(routeName, webIds);
    }

    async buildMessage(message) {
        var mess = message.url;
        //message
        await data[mess].schema$text.add(message.content);
        await data[mess].rdfs$label.add("routeShared: " + message.title);
        await data[mess].schema$dateSent.add(message.date.toISOString());
        await data[mess].rdf$type.add(namedNode('https://schema.org/Message'));
        await data[mess].schema$sender.add(namedNode(this.webId));
    }

    getSessionName() {
        var session = this.webId;
        var tmp = session.split(".")[0];
        return tmp.split("//")[1];
    }

    getWebIdWithoutProfile() {
        let wId = this.webId;
        let tmp = wId.split("profile")[0];
        return tmp;
    }
}

export default ShareView;