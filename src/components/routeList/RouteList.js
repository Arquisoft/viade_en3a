import React from 'react';
import RouteCard from './RouteCard';

// TODO: Remove
const points = [[43.211820, -5.787902],
[43.210796, -5.786690],
[43.210082, -5.785064],
[43.209800, -5.783841],
[43.210121, -5.782339],
[43.210379, -5.780773],
[43.209754, -5.777683]];

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
                    routePoints={points}
                />
                <RouteCard
                    routeName="Fuso de la Reina"
                    routeAuthor="María santísima"
                    routeDescription="Easy to complete, mostly straight lines. Concrete does its job turning your knees into dust."
                    routeImageSource="http://www.senderismoenasturias.es/ovimolin.jpg"
                    routePoints={points}
                />
                <RouteCard
                    routeName="Cares"
                    routeAuthor="Aventura"
                    routeDescription="Medium difficulty, a little bit steep in some parts but still worth to witness."
                    routeImageSource="https://www.desnivel.com/images/2012/04/roberto-colmenero.-mi-padre-y-hermano-960x1280.jpg"
                    routePoints={points}
                />
                <RouteCard
                    routeName="Picos de Europa"
                    routeAuthor="Viade"
                    routeDescription="Interesting passages make this route unique on its own. Visit worthy."
                    routeImageSource="http://soyrural.es/wp-content/uploads/2017/07/ruta-del-Cares.jpg"
                    routePoints={points}
                /><RouteCard
                    routeName="Las Xanas"
                    routeAuthor="Miguel Menéndez"
                    routeDescription="Really beautiful landscape but not wise to traverse with kids. They might fall off of some cliff."
                    routeImageSource="https://www.senditur.com/multimedia/uploads/images/Rutas/Espa%C3%B1a/Asturias/Ruta%20de%20Las%20Xanas/Ruta_de_Las_Xanas.jpg"
                    routePoints={points}
                />
                <RouteCard
                    routeName="Fuso de la Reina"
                    routeAuthor="María santísima"
                    routeDescription="Easy to complete, mostly straight lines. Concrete does its job turning your knees into dust."
                    routeImageSource="http://www.senderismoenasturias.es/ovimolin.jpg"
                    routePoints={points}
                />
                <RouteCard
                    routeName="Cares"
                    routeAuthor="Aventura"
                    routeDescription="Medium difficulty, a little bit steep in some parts but still worth to witness."
                    routeImageSource="https://www.desnivel.com/images/2012/04/roberto-colmenero.-mi-padre-y-hermano-960x1280.jpg"
                    routePoints={points}
                />
                <RouteCard
                    routeName="Picos de Europa"
                    routeAuthor="Viade"
                    routeDescription="Interesting passages make this route unique on its own. Visit worthy."
                    routeImageSource="http://soyrural.es/wp-content/uploads/2017/07/ruta-del-Cares.jpg"
                    routePoints={points}
                /><RouteCard
                    routeName="Las Xanas"
                    routeAuthor="Miguel Menéndez"
                    routeDescription="Really beautiful landscape but not wise to traverse with kids. They might fall off of some cliff."
                    routeImageSource="https://www.senditur.com/multimedia/uploads/images/Rutas/Espa%C3%B1a/Asturias/Ruta%20de%20Las%20Xanas/Ruta_de_Las_Xanas.jpg"
                    routePoints={points}
                />
                <RouteCard
                    routeName="Fuso de la Reina"
                    routeAuthor="María santísima"
                    routeDescription="Easy to complete, mostly straight lines. Concrete does its job turning your knees into dust."
                    routeImageSource="http://www.senderismoenasturias.es/ovimolin.jpg"
                    routePoints={points}
                />
                <RouteCard
                    routeName="Cares"
                    routeAuthor="Aventura"
                    routeDescription="Medium difficulty, a little bit steep in some parts but still worth to witness."
                    routeImageSource="https://www.desnivel.com/images/2012/04/roberto-colmenero.-mi-padre-y-hermano-960x1280.jpg"
                    routePoints={points}
                />
                <RouteCard
                    routeName="Picos de Europa"
                    routeAuthor="Viade"
                    routeDescription="Interesting passages make this route unique on its own. Visit worthy."
                    routeImageSource="http://soyrural.es/wp-content/uploads/2017/07/ruta-del-Cares.jpg"
                    routePoints={points}
                />
            </div>
        </div >
    );
}

// function fetchRoutesFromPod() {
//     // TODO
// }

export default RouteList;