import React from "react";
import * as auth from 'solid-auth-client';
import SolidFileClient from 'solid-file-client';
import data from '@solid/query-ldflex';
import Table from 'react-bootstrap/Table';
import { namedNode } from '@rdfjs/data-model';
class ShareView extends React.Component {

    constructor(props) {
        super();
        this.routeId = props.match.params.id;
        this.session = null;
        this.webId= null;
        this.friends = [];
    }

    render() {
        this.readFriends()
        return (
            <div>
                {
                this.friends.map((friend) =>{
                    return <div>
                        <h3>{friend.name}</h3>
                        <button className="btn-primary" onclick={this.send()}>Share</button>
                    </div>;
                })}
            </div>
        );
    }
    
    printTable(){
        
    }
 
    async readFriends(){
        this.session = await auth.currentSession();
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
}

export default ShareView;