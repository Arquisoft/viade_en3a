import React from 'react';
import InfoView from '../pages/InfoView.js';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RouteManager from "./../model/RouteManager";
import MyRoute from "./../model/MyRoute";

const routeManager = new RouteManager();

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

test('Test create route', async () => {
    const match = { params: { id: "1" } };
    const myRoute = new MyRoute(
        "Fuso de la Reina",
        "María santísima",
        "Easy to complete, mostly straight lines. Concrete does its job turning your knees into dust.",
        [{ lat: 0, lng: 2 }, { lat: 1, lng: 1 }],
        routeManager.getMemoiser()
    );
    await sleep(2000);
    const myRoute2 = new MyRoute(
        "Fuso de la Reina",
        "María santísima",
        "Easy to complete, mostly straight lines. Concrete does its job turning your knees into dust.",
        [{ lat: 0, lng: 2 }, { lat: 1, lng: 1 }],
        routeManager.getMemoiser()
    );
    routeManager.addRoute(myRoute);
    routeManager.addRoute(myRoute2);
    const { getByTestId } = render(<div data-testid="test" ><InfoView match={match} routeManager={routeManager} /></div>);
    expect(getByTestId("test")).toHaveAttribute("data-testid", "test");
});