import React from "react";
import { Translation } from 'react-i18next';
import viadeMainView from '../assets/howRoutesWork/main.png';
import viadeSampleRoutes from '../assets/howRoutesWork/Screenshot_2.png';
import viadeCreateRoute from '../assets/howRoutesWork/createRoute.png'; // TODO; Update Pic
import viadeDetailsRoute from '../assets/howRoutesWork/routeDetails.png';
import viadeShareRoute from '../assets/howRoutesWork/shareRoutes.png';

import '../css/routeHelp.css';

export default class RouteHelp extends React.Component {
    // TODO; add h1 padding to style
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
            list.push(
                <Translation>
                    {(t) => <h3>{(i+1) + ".- " + t(e[0])}</h3>}
                </Translation>
                );
        }

        return <div class="index">
            <Translation role="title">
                {(t) => <h2>{t("routeHelpIndex")}</h2>}
            </Translation>
            {list}
        </div>;
    }

    getIntroduction(){
        return <div class="helpElement">
            <Translation role="title">
                {(t) => <h2>{t('routeHelpIntro')}</h2>}
            </Translation>
            <Translation>
                {(t) => <p>{t('routeHelpIntro_1')}</p>}
            </Translation>
            <img alt="Viade main view" src={viadeMainView} width="65%"/>
            <Translation>
                {(t) => <p>{t('routeHelpIntro_2')}</p>}
            </Translation>
            <img alt="Viade sample routes" src={viadeSampleRoutes} width="65%"/>
        </div>;
    }

    getCreateAPod(){
        return <div class="helpElement">
            <Translation role="title">
                {(t) => <h2>{t('routeHelpCreatePOD')}</h2>}
            </Translation>
            <Translation>
                {(t) => <p>{t('routeHelpCreatePOD_1')}</p>}
            </Translation>
        </div>;
    }

    getLogin(){
        return <div class="helpElement">
            <Translation role="title">
                {(t) => <h2>{t('routeHelpLogin')}</h2>}
            </Translation>
            <Translation>
                {(t) => <p>{t('routeHelpLogin_1')}</p>}
            </Translation>
        </div>;
    }

    getCreateARoute(){
        return <div class="helpElement">
            <Translation role="title">
                {(t) => <h2>{t('routeHelpCreateRoutes')}</h2>}
            </Translation>
            <Translation>
                {(t) => <p>{t('routeHelpCreateRoutes_1')}</p>}
            </Translation>
            <img alt="Create your route" src={viadeCreateRoute} width="65%"/>
        </div>;
    }

    getViewARoute(){
        return <div class="helpElement">
            <Translation role="title">
                {(t) => <h2>{t('routeHelpViewRoutes')}</h2>}
            </Translation>
            <Translation>
                {(t) => <p>{t('routeHelpViewRoutes_1')}</p>}
            </Translation>
            <img alt="Details of the route" src={viadeDetailsRoute} width="65%"/>
        </div>;
    }

    getShareWithFiends(){
        return <div class="helpElement">
            <Translation role="title">
                {(t) => <h2>{t('routeHelpShareRoutes')}</h2>}
            </Translation>
            <Translation>
                {(t) => <p>{t("routeHelpShareRoutes_1")}</p>}
            </Translation>
            <img alt="Share route" src={viadeShareRoute} width="65%"/>
        </div>;
    }
}