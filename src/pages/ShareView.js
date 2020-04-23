import React from "react";
import * as auth from 'solid-auth-client';
import data from '@solid/query-ldflex';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { namedNode } from '@rdfjs/data-model';
import PodPermissionHandler from "../components/podService/podPermissionHandler";
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
            <div className="App-header">
            <div style={{backgroundColor: "#282c34", 
            display:"flex", 
            flexDirection: "row",
            justifyContent:"center",
            color:"black"}}>
                {
                    this.state.friends.map((friend) => {
                        return <div> 
                        <Card style={{ width: '18rem' , margin: "10px"}}>
                            <Card.Img variant="top" src={friend.image} />
                            <Card.Body>
                                <Card.Title>{friend.name}</Card.Title>
                                <Button variant="primary" 
                                onClick={() => {this.send(friend.inbox);}}>Share</Button>
                            </Card.Body>
                        </Card>
                        </div>;
                    })
                }
            </div>
            </div>
        );
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
        this.setState({ friends });
    }


    async send(destination) {
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
        alert ("Your friend has received a notification with your route!");

        this.changePermissions(this.id + ".json", [destination.split("inbox")[0] + "profile/card#me"]);
    }

    async changePermissions(routeName, webIds){
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

    getSessionName(){
        var session = this.webId;
        var tmp = session.split(".")[0];
        return tmp.split("//")[1];
    }

    getWebIdWithoutProfile(){
        let wId = this.webId;
        let tmp = wId.split("profile")[0];
        return tmp;

    }

}

export default ShareView;