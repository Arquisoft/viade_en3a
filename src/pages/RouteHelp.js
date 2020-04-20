import React from "react";
import { useTranslation } from 'react-i18next';
import { Translation } from 'react-i18next';
import viadeMainView from '../assets/howRoutesWork/main.png';
import viadeSampleRoutes from '../assets/howRoutesWork/Screenshot_2.png';
import viadeCreateRoute from '../assets/howRoutesWork/createRoute.png'; // TODO; Update Pic
import viadeDetailsRoute from '../assets/howRoutesWork/routeDetails.png';
import viadeShareRoute from '../assets/howRoutesWork/shareRoutes.png';

export default class RouteHelp extends React.Component {

    constructor(props){
        super(props);
        this.orderOfElements = [
            [("routeHelpIntro"),    this.getIntroduction],
            [("routeHelpCreatePOD"),    this.getCreateAPod],
            [("routeHelpLogin"),    this.getLogin],
            [("routeHelpCreateRoutes"),    this.getCreateARoute],
            [("routeHelpViewRoutes"),    this.getViewARoute],
            [("routeHelpShareRoutes"),    this.getShareWithFiends],
        ];
    }

    render() {
        let interior = [this.getIndex()];
        for (let i = 0; i < this.orderOfElements.length; i++) {
            let e = this.orderOfElements[i];
            interior.push(e[1]());
        }
        return <div>{interior}</div>;
    }

    getIndex(){
        let list = [];
        for (let i = 0; i < this.orderOfElements.length; i++) {
            let e = this.orderOfElements[i];
            console.log(e);
            list.push(
                <Translation>
                    {(t) => <h3>{(i+1) + ".- " + t(e[0])}</h3>}
                </Translation>
                );
        }

        return <div>
            <Translation role="title">
                {(t) => <h2>{t("routeHelpIndex")}</h2>}
            </Translation>
            {list}
        </div>;
    }

    getIntroduction(){
        return <div>
            <Translation role="title">
                {(t) => <h2>{t('routeHelpIntro')}</h2>}
            </Translation>
            <p>Viade is an Application whose task is to manage routes.</p>
            <img src={viadeMainView} width="65%"/>
            <p>It allows you to store your favourite scenic routes on your Solid Pod and to share it with your friends and family as well as comment on those of your friends'.</p>
            <img src={viadeSampleRoutes} width="65%"/>
        </div>;
    }

    getCreateAPod(){
        return <div>
            <Translation role="title">
                {(t) => <h2>{t('routeHelpCreatePOD')}</h2>}
            </Translation>
            <p>If you are not an owner of a POD you can create one by pressing the register button. This will redirect you to a provider, where you can create your POD.</p>
        </div>;
    }

    getLogin(){
        return <div>
            <Translation role="title">
                {(t) => <h2>{t('routeHelpLogin')}</h2>}
            </Translation>
            <p>Once the POD is created, press the login button and a popup will ask you for credentials. Once logged in you will have access to new options.</p>
        </div>;
    }

    getCreateARoute(){
        return <div>
            <Translation role="title">
                {(t) => <h2>{t('routeHelpCreateRoutes')}</h2>}
            </Translation>
            <p>From "Route Management > Create a new Route" you can create a new route. Just set a title, description, select the waypoints of the route and press "Save route in POD".</p>
            <img src={viadeCreateRoute} width="65%"/>
        </div>;
    }

    getViewARoute(){
        return <div>
            <Translation role="title">
                {(t) => <h2>{t('routeHelpCreateRoutes')}</h2>}
            </Translation>
            <p>We can now navigate to "Route Management > My Routes", where the routes you have created are listed. When clicking on "Info" of the new route a new window will display all the information recorded, as well as comments posted and a elevation chart of the waypoints.</p>
            <img src={viadeDetailsRoute} width="65%"/>
        </div>;
    }

    getShareWithFiends(){
        return <div>
            <Translation role="title">
                {(t) => <h2>{t('routeHelpCreateRoutes')}</h2>}
            </Translation>
            <p>When displaying all routes "Route Management > My Routes", you can click on the share option. This will list all friends and when clicking share, a message with the route will be sent to the inbox of your friend.</p>
            <img src={viadeShareRoute} width="65%"/>
        </div>;
    }
}