import React from 'react';
import InfoView from '../pages/InfoView.js';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RouteManager from "./../model/RouteManager";

const routeManager = new RouteManager();

test('Test create route', () => {

    const match = { params: { id: "1" } };

    const { getByText } = render(<InfoView match={match} routeManager={routeManager} />);

    expect(getByText("Route Info")).toBeInTheDocument();
});