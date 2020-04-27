import React from "react";
import * as auth from 'solid-auth-client';
import data from '@solid/query-ldflex';
import Card from 'react-bootstrap/Card';
import { Button, Form} from 'react-bootstrap';
import { Translation } from 'react-i18next';
import i18n from '../i18n';
import MyGroup from "../model/MyGroup";
import { ToastContainer, toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

class CreateGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            friends: [],
        };
        this.groupMembers = [];
        this.groupName = "";
        this.readFriends();
        this.webId = null;
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

		if (this.groupName === "") {
            valid = false;
            toast.error(i18n.t('alertName'));
		}
		if (this.groupMembers.length < 1) {
			valid = false;
			toast.error(i18n.t('alertMembers'));
        }
        if (!valid) {
			document.getElementById("btnCreate").disabled = false;
			return undefined;
		}

		let group = undefined;
        group = new MyGroup(this.groupName, this.groupMembers);

		return group;
    }
    
    async annotateFriend(friend){
        var included = this.groupMembers.includes(friend);
        if (included){
            toast.error(friend.name + i18n.t('alertAlreadyIncluded'));
        } else {
            this.groupMembers.push(friend);
            toast.success(friend.name + i18n.t('alertAddedSuccessfully'));
        }
    }

    async uploadToPod(groupName) {
        this.groupName=groupName;
		let group = await this.createGroup();
		if (group === undefined) {
			return;
		}
		await group.uploadToPod((filePodUrl) => {
			if (filePodUrl === null) {
				toast.error(i18n.t('alertAccessPOD'));
			} else {
				window.location.href = "#groups";
			}
		});
	}

    render() {
        return (
            <div className="App-header">
                <ToastContainer
					id="toastContainer"
					position={toast.POSITION.TOP_CENTER}
					autoClose={5000}
				/>
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
                                        (t) => <Button variant="success"
                                        onClick={() => {this.annotateFriend(friend);}}>
                                            {t('groupsAdd')}</Button>
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
                                    (t) => <Button id="btnCreate" variant="primary"
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