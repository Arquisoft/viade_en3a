import React from "react";
import RouteManager from "../model/RouteManager";
import {CardDeck, Spinner} from "react-bootstrap";
import RouteCard from "../components/routeList/RouteCard";
import {toast, ToastContainer} from "react-toastify";
import {Translation} from "react-i18next";
import PodStorageHandler from "../components/podService/podStoreHandler";
import MyRoute from "../model/MyRoute";
import $ from "jquery";
import RouteList from "./RouteList";
import Button from "react-bootstrap/Button";
const auth = require('solid-auth-client');

export default class RouteSharedList extends RouteList {

    constructor(props) {
        super(props);
        /*this.routeManager = RouteManager;
        this.cardDeckSize = 4;
        this.state = {
            routes: [],
            sharedRoutes : [],
            spinnerHidden: false,
        };
        if (props.sync == undefined || props.sync == true) { // avoid sync with pod, used for RouteList.test.js
            this.readInbox();
            this.syncRoutesWithPod().then(() => {
                this.state.spinnerHidden = true;
            });
            this.processedRoutes = 0;
            this.retrievedRoutes = 0;
        }*/
        this.readInbox();
    }

    async readInbox() {
        new PodStorageHandler(await auth.currentSession()).checkInbox();
    }

    render() {
        let routesForCardDecks = [];
        let counter = 0;
        while (counter <= this.state.sharedRoutes.length) {
            routesForCardDecks.push(
                <CardDeck style={{ padding: "1% 0% 1% 2%", width: "100%" }}>
                    {this.state.sharedRoutes.slice(counter, counter + this.cardDeckSize).map(
                        (r) => {return <RouteCard route={r} showShareButton={false} />;}
                    )}
                </CardDeck>
            );
            counter += this.cardDeckSize;
        }

        return (
            <div>
                <ToastContainer
                    position={toast.POSITION.TOP_CENTER}
                    autoClose={5000}
                />
                <Translation>
                    {
                        (t) => <h1 style={{ padding: "1%" }}>{t('routeListText')}</h1>
                    }
                </Translation>
                <Button onClick = {() => {

                    if (window.confirm("Are you sure?"))
                        this.cleanSharedFolder();
                }}>Exterminate Shared Folder</Button>
                <Translation>
                    {
                        (t) => <h2 style={{ padding: "1%" }} hidden={this.state.spinnerHidden}>{t('routeListLoadingMessage')}</h2>
                    }
                </Translation>

                <Spinner id={"spinner"} hidden={this.state.spinnerHidden} animation="border" />
                {routesForCardDecks}
                <div id="messageArea">
                    {this.state.message}
                </div>
            </div>
        );
    }

    async cleanSharedFolder(){
        let session = await auth.currentSession();
        let storageHandler = new PodStorageHandler(session);
        storageHandler._eliminateSharedFolder();
        toast.success("Routes Eliminated!");
        //this.syncRoutesWithPod();
    }

}