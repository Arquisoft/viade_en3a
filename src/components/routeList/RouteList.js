import React from 'react';
import RouteCard from './RouteCard';

function RouteList(props) {
    // TODO: (Idea) Call fetchRoutesFromPod() and obtain something iterable.
    // So that when fetched I can create a new Card for each Route
    // with needed parameters. 
    return (
        <div id="routeList">
            <RouteCard
                routeName="Las Xanas"
                routeAuthor="Miguel Menéndez"
                routeDescription="Really beautiful landscape but not wise to traverse with kids. They might fall off of some cliff."
                routeImageSource="https://www.senditur.com/multimedia/uploads/images/Rutas/Espa%C3%B1a/Asturias/Ruta%20de%20Las%20Xanas/Ruta_de_Las_Xanas.jpg"
            />
            <RouteCard
                routeName="Fuso de la Reina"
                routeAuthor="María santísima"
                routeDescription="Easy to complete, mostly straight lines. Concrete does its job turning your knees into dust."
                routeImageSource="http://www.senderismoenasturias.es/ovimolin.jpg"
            />
            <RouteCard
                routeName="Cares"
                routeAuthor="Aventura"
                routeDescription="Medium difficulty, a little bit steep in some parts but still worth to witness."
                routeImageSource="https://www.desnivel.com/images/2012/04/roberto-colmenero.-mi-padre-y-hermano-960x1280.jpg"
            />
            <RouteCard
                routeName="Picos de Europa"
                routeAuthor="Viade"
                routeDescription="Interesting passages make this route unique on its own. Visit worthy."
                routeImageSource="http://soyrural.es/wp-content/uploads/2017/07/ruta-del-Cares.jpg"
            />
        </div>
    );
}

function fetchRoutesFromPod() {
    // TODO
}

export default RouteList;