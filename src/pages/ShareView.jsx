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
    }

    render() {
        return (
            <div>
                {
                    this.state.friends.map((friend) => {
                        return <div>
                            <h3>{friend.name}</h3>
                            <button className="btn-primary" onclick={this.send}>Share</button>
                        </div>;
                    })
                }
            </div>
        );
    }

    async send() {

    }

    async readFriends() {
        this.session = await auth.currentSession();
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
}

export default ShareView;