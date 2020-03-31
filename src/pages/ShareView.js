import React from "react";
import * as auth from 'solid-auth-client';
import SolidFileClient from 'solid-file-client';
import data from "@solid/query-ldflex";

class ShareView extends React.Component {

    constructor(props) {
        super();
        this.routeId = props.match.params.id;
        this.session = await auth.currentSession();
        this.webId= null;
        this.friends = [];
    }

    render() {
        this.readFriends();
        return (
            <Table stripped bordered hover>
            <th>
                <tr>
                    <th>#</th>
                    <th rowSpan="2">Name</th>
                    <th>Share</th>
                </tr> 
            </th>
            {this.printRows()}
            </Table>
        );
    }

    printRows(){
        let counter = 0;
        while(counter < this.friends.length){
            <tr>
                <td>{counter}</td>
                <td rowSpan="2">{this.friends[counter].name}</td>
                <td>
                    <Button variant="primary"> Share
                    </Button>
                </td>
            </tr>
        }
    }

    async readFriends(){
        var app = this;
        this.friends = [];
        app.friends = [... app.friends]
        for await (const friend of data.user.friends){
            const f = {}
            const n = await data[friend].vcard$fn;
            const inbox = await data[friend].inbox;
            f.webId= `${friend}`
            f.name = `${n}`
            f.inbox = `${inbox}`
            if (n ==undefined){
                f.name = `${friend}`
            }
          app.friends = [... app.friends, f]
        }
    }
    
    async send(){
        var message = {}
        message.date = new Date(Date.now())
        message.id = message.date.getTime()
        message.sender = this.webId
        message.recipient = this.recipient
        message.content = this.shadowRoot.getElementById("messageContent").value.trim()
        message.title = this.shadowRoot.getElementById("title").value.trim()
        message.url = message.recipient+message.id+".ttl"
        this.shadowRoot.getElementById("to").value = ""
        this.shadowRoot.getElementById("title").value = ""
        this.shadowRoot.getElementById("messageContent").value = ""
        this.shadowRoot.getElementById("writePan").style.display = "none"
        if(message.content.length > 0 && message.title.length > 0 && message.recipient.length > 0){
            this.buildMessage(message)
        }else{
            alert("Recipient or title or content is empty")
        }
    
    }

    async buildMessage(message){
        var mess = message.url
        //message
        await data[mess].schema$text.add(message.content);
        await data[mess].rdfs$label.add(message.title)
        await data[mess].schema$dateSent.add(message.date.toISOString())
        await data[mess].rdf$type.add(namedNode('https://schema.org/Message'))
        await data[mess].schema$sender.add(namedNode(this.webId))
        //log
        var log = message.recipient+"log.ttl#"+message.id
        await data[log].schema$message.add(namedNode(mess))
        await data[log].schema$dateSent.add(message.date.toISOString())
        await data[log].schema$sender.add(namedNode(this.webId))
        await data[log].rdfs$label.add(message.title)
      }
}

export default ShareView;