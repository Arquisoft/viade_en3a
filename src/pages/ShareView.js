import React from "react";
import * as auth from 'solid-auth-client';
import SolidFileClient from 'solid-file-client';
import data from '@solid/query-ldflex';
import Table from 'react-bootstrap/Table';
import { namedNode } from '@rdfjs/data-model';
class ShareView extends React.Component {

    constructor(props) {
        super();
        this.state = {
            friends: []
        };
        this.readFriends();
        this.webId = null;
        this.messages = [];
    }

    render() {
        return (
            <div>
                {
                    this.state.friends.map((friend) => {
                        return <div>
                            <h3>{friend.name}</h3>
                            <button className="btn-primary" onclick={this.send(friend.inbox)}>Share</button>
                        </div>;
                    })
                }
            </div>
        );
    }

    async readFriends() {
        this.webId = await auth.currentSession();
        var app = this;
        let friends = [];
        for await (const friend of data.user.friends) {
            const f = {}
            const n = await data[friend].vcard$fn;
            const inbox = await data[friend].inbox;
            f.webId = `${friend}`
            f.name = `${n}`
            f.inbox = `${inbox}`
            if (n == undefined) {
                f.name = `${friend}`
            }
            friends = [...friends, f]
        }
        this.setState({ friends: friends });
    }


    async send(destination) {
        var message = {};
        message.date = new Date(Date.now());
        message.id = message.date.getTime();
        message.sender = await auth.currentSession();
        message.recipient = destination;

        message.content = "Holaa, esto es una prueba";

        message.title = "Check out this route shared to you by " + this.getSessionName();
        message.url = message.recipient + message.id + ".json";

        await this.buildMessage(message);
        
    }

    async buildMessage(message) {
        var mess = message.url
        //message
        await data[mess].schema$text.add(message.content);
        await data[mess].rdfs$label.add(message.title);
        await data[mess].schema$dateSent.add(message.date.toISOString());
        await data[mess].rdf$type.add(namedNode('https://schema.org/Message'));
        await data[mess].schema$sender.add(namedNode(this.webId));
    }

    async getSessionName(){
        var session = await auth.currentSession();
        var tmp = session.webId.split(".")[0];
        return tmp.split("//")[1];
    }
}

export default ShareView;