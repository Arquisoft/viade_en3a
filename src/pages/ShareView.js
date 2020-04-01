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
        this.id = props.match.params.id;
    }

    render() {
        return (
            <div>
                {
                    this.state.friends.map((friend) => {
                        return <div>
                            <h3>{friend.name}</h3>
                            <button className="btn-primary" onClick={() => {this.send(friend.inbox)}}>Share</button>
                        </div>;
                    })
                }
            </div>
        );
    }

    async readFriends() {
        let session = await auth.currentSession(); 
        this.webId = session.webId;
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
        console.log(this.webId)
    }


    async send(destination) {
        var message = {};
        message.date = new Date(Date.now());
        message.id = message.date.getTime();
        message.sender = this.webId;
        message.recipient = destination;

        let folder = "/viade/routes/"
        message.content = this.getWebIdWithoutProfile() + folder + this.id + ".json";

        message.title = "Check out this route shared to you by " + this.getSessionName();
        message.url = message.recipient + message.id + ".json";

        await this.buildMessage(message);
        
    }

    async buildMessage(message) {
        console.log(message);
        var mess = message.url;
        //message
        await data[mess].schema$text.add(message.content);
        await data[mess].rdfs$label.add("routeShared: message.title");
        await data[mess].schema$dateSent.add(message.date.toISOString());
        await data[mess].rdf$type.add(namedNode('https://schema.org/Message'));
        await data[mess].schema$sender.add(namedNode(this.webId));
    } 

    getSessionName(){
        var session = this.webId;
        var tmp = session.split(".")[0];
        return tmp.split("//")[1];
    }

    getWebIdWithoutProfile(){
        let wId = this.webId;
        let tmp = wId.split("profile")[0];
        console.log(tmp);
        return tmp;

    }

}

export default ShareView;