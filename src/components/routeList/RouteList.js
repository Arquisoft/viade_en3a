import React from 'react';
import RouteCard from './RouteCard';

import { caresRoutePoints, xanasRoutePoints, boldRoutePoints } from './Points';

const routeListStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: "2%"
};

function RouteList(props) {
    return (
        <div className="App-header">
            <h1>Route list</h1>
            <div style={routeListStyle}>
                <RouteCard
                    routeName="Las Xanas"
                    routeAuthor="Miguel Menéndez"
                    routeDescription="Really beautiful landscape but not wise to traverse with kids. They might fall off of some cliff."
                    routeImageSource="https://www.senditur.com/multimedia/uploads/images/Rutas/Espa%C3%B1a/Asturias/Ruta%20de%20Las%20Xanas/Ruta_de_Las_Xanas.jpg"
                    routePoints={xanasRoutePoints}
                />
                <RouteCard
                    routeName="Fuso de la Reina"
                    routeAuthor="María santísima"
                    routeDescription="Easy to complete, mostly straight lines. Concrete does its job turning your knees into dust."
                    routeImageSource="http://www.senderismoenasturias.es/ovimolin.jpg"
                    routePoints={boldRoutePoints}
                />
                <RouteCard
                    routeName="Cares"
                    routeAuthor="Aventura"
                    routeDescription="Medium difficulty, a little bit steep in some parts but still worth to witness."
                    routeImageSource="https://www.desnivel.com/images/2012/04/roberto-colmenero.-mi-padre-y-hermano-960x1280.jpg"
                    routePoints={caresRoutePoints}
                />
                <RouteCard
                    routeName="Picos de Europa"
                    routeAuthor="Viade"
                    routeDescription="Interesting passages make this route unique on its own. Visit worthy."
                    routeImageSource="http://soyrural.es/wp-content/uploads/2017/07/ruta-del-Cares.jpg"
                    routePoints={boldRoutePoints}
                />
            </div>
        </div >
    );
}

// function fetchRoutesFromPod() {
//     // TODO
// }

export default RouteList;