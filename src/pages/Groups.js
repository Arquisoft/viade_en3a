import './../css/App.css';
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast, ToastContainer } from "react-toastify";
import FriendCard from '../components/friendCard/FriendCard';
import { Translation } from 'react-i18next';
import i18n from '../i18n';
import PodStorageHandler from "../components/podService/podStoreHandler";
import MyGroup from "../model/MyGroup";

import $ from "jquery";

import 'react-toastify/dist/ReactToastify.css';

const auth = require('solid-auth-client');

const groupsStyle = {
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: "2%"
};

class Groups extends Component {

    constructor(props) {
        super(props);
        this.groupManager = props.groupManager;
        this.state = {
            groups: [],
            spinnerHidden: false
        };
        this.syncGroupsWithPod().then(() => {
            this.state.spinnerHidden = true;
        });
        this.processedGroups = 0;
        this.retrievedGroups = 0;
    }

    async syncGroupsWithPod() {
        this.groupManager.resetGroups();
        let session = await auth.currentSession();
        if (session !== null && session !== undefined) {
            let storageHandler = new PodStorageHandler(session);
            storageHandler.getGroups((groupJson, error) => {
                if (groupJson === null) {
                    toast.error(i18n.t('alertAccessPOD'));
                } else {
                    if (groupJson.length !== 0) {
                        let tempGroup = new MyGroup("", []);
                        tempGroup.modifyFromJsonLd(JSON.parse(groupJson));
                        this.groupManager.addGroup(tempGroup);
                        let tempList = this.state.groups;
                        tempList.push(tempGroup);
                        this.processedGroups += 1;
                        if (this.processedGroups === this.retrievedGroups) {
                            this.setState({ groups: tempList });
                            $("#messageArea").empty();
                        }
                    }
                }
            }).then(
                (result) => {
                    if (result === 0) {
                        this.setState({
                            message:
                                <div>
                                    <h3>Oops! We didn't find any route in your POD</h3>
                                    <p>You can move to "Route management >> Create a new route" to add a new route!</p>
                                </div>
                        });
                    } else {
                        this.retrievedGroups = result;
                    }
                }
            );
        }
    }

    render() {
        return (
            <div className="App-FlexCenterColumn">
            <Translation>
                {
                    (t) => <h1 style={{ padding: "1%" }}>{t('groupsTitle')}</h1>
                }
            </Translation>
            <Translation>
                    {
                        (t) => <Button variant="primary" size="lg" href="#createGroup" 
                        style={{ margin: "2vh" }}>{t('groupsCreate')}</Button>
                    }
            </Translation>
            <div style={groupsStyle}>
                {
                    this.state.groups.map((group) => {
                        return <div>
                            <h2>{group.name}</h2>
                            <div>
                                {
                                    group.users.map((user) => {
                                        return <div style={groupsStyle}>
                                            <FriendCard
                                                friendImage={user.image}
                                                friendName={user.name}
                                                friendLink={user.webId}
                                                />
                                        </div>;
                                    })
                                }
                            </div>;
                        </div>;
                    })
                }

            </div>
            <div id="messageArea">
                    {this.state.message}
            </div>
        </div >
        );

    }

}

export default Groups;