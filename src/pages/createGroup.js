import React from "react";
import * as auth from 'solid-auth-client';
import data from '@solid/query-ldflex';
import Card from 'react-bootstrap/Card';
import { Button, Form } from 'react-bootstrap';
import { namedNode } from '@rdfjs/data-model';
import PodPermissionHandler from "../components/podService/podPermissionHandler";
import { Translation } from 'react-i18next';
import UserDetails from "../model/Util";
import MyGroup from "../model/MyGroup";
import { ToastContainer, toast } from "react-toastify";

class CreateGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            friends: [],
        };
        this.groupMembers = [];
        this.groupName = null;
        this.readFriends();
        this.webId = null;
        this.isAdded = false;
        this.newGroup = new MyGroup("", []);
        this.nameRef = React.createRef();
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

    async createGroup(){
		document.getElementById("btnCreate").disabled = true;
		toast.dismiss();
		let valid = true;
        
		if (this.groupName === '') {
			valid = false;
			toast.error("Name can't be empty");
		}
		if (this.groupMembers.length < 1) {
			valid = false;
			toast.error("A group has to have at least 1 member");
        }
        if (!valid) {
			document.getElementById("btnCreate").disabled = false;
			return undefined;
		}

		let group = undefined;
        group = new MyGroup(this.groupName, this.groupMembers);
        console.log(group);
		return group;
    }
    
    async annotateFriend(friend){
        this.groupMembers.push(friend.webId);
    }

    async uploadToPod(groupName) {
        this.groupName=groupName;
		let group = await this.createGroup();
		if (group === undefined) {
			return;
		}
		await group.uploadToPod((filePodUrl) => {
			if (filePodUrl === null) {
				toast.error("We can't access your POD. Please, review its permissions");
			} else {
				window.location.href = "#groups";
			}
		});
	}

    render() {
        return (
            <div className="App-header">
                <h1>Select the members</h1>
                <div style={{backgroundColor: "#282c34", 
                display:"flex", 
                flexDirection: "row",
                justifyContent:"center",
                color:"black"}}>
                    {
                        this.state.friends.map((friend) => {
                            return <div> 
                            <Card style={{ flexWrap: "wrap",
                                justifyContent: "space-between",
                                padding: "2%"}}>
                                <Card.Img variant="top" src={friend.image} />
                                <Card.Body>
                                    <Card.Title>{friend.name}</Card.Title>
                                    <Translation> 
                                        {
                                        (t) => <Button variant="success" disabled={this.isAdded} 
                                        onClick={() => {this.annotateFriend(friend);}}>
                                            {this.isAdded ? t('groupsAdded') : t('groupsAdd')}</Button>
                                        }
                                    </Translation>
                                </Card.Body>
                            </Card>
                            </div>;
                        })
                    }
                </div>
                    <Form style={{ margin: "1%" }}>
                        <Form.Group>
                            <Form.Label>Group name</Form.Label>
                            <Form.Control type="groupName" placeholder="Group name" ref={this.nameRef}/>
                            <Translation> 
                                {
                                    (t) => <Button id="btnCreate" variant="primary" href="#groups"
                                    onClick={() => {this.uploadToPod(this.nameRef.current.value);}}>{t('groupsCreateBtn')}</Button>
                                }
                            </Translation>
                        </Form.Group>
                    </Form>
            </div>
        );
    }

}

export default CreateGroup;