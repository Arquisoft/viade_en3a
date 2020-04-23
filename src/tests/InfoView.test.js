import React from 'react';
import InfoView from '../pages/InfoView.js';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RouteManager from "./../model/RouteManager";
import MyRoute from "./../model/MyRoute";
import assert from 'assert';

const routeManager = RouteManager;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

test('Test create route', async () => {
    const myRoute = new MyRoute(
        "Fuso de la Reina",
        "María santísima",
        "Easy to complete, mostly straight lines. Concrete does its job turning your knees into dust.",
        [{ lat: 0, lng: 2 }, { lat: 1, lng: 1 }]
    );
    const author = myRoute.getAuthor();
    assert.equal(author, "María santísima");
    const jsonLd = myRoute.toJsonLd();
    const temproute = new MyRoute("", "", "", []);
    temproute.modifyFromJsonLd(JSON.parse(jsonLd));
    myRoute.getId();
    const match = { params: { id: myRoute.getId() } };
    await sleep(2000);
    const myRoute2 = new MyRoute(
        "Fuso de la Reina",
        "María santísima",
        "Easy to complete, mostly straight lines. Concrete does its job turning your knees into dust.",
        [{ lat: 0, lng: 2 }, { lat: 1, lng: 1 }]
    );
    routeManager.addRoute(myRoute);
    routeManager.addRoute(myRoute2);
    const { getByTestId } = render(<div data-testid="test" ><InfoView match={match} routeManager={routeManager} /></div>);
    expect(getByTestId("test")).toHaveAttribute("data-testid", "test");
});