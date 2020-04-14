import React from 'react';
import MapCreation from './../pages/MapCreation';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RouteManager from "./../model/RouteManager";

const routeManager = new RouteManager();

test('Test create route', () => {
	const { getByText, getByRole } = render(<MapCreation routeManager={routeManager} />);

	const map = getByRole('presentation');
	const leftClick = { button: 1 };
	fireEvent.click(map, leftClick);

	const title = getByRole('title');
	fireEvent.click(title, leftClick);
	fireEvent.keyDown(title, { key: 'A' });

	const btn = getByText(/save/i);

	expect(getByText('mapCreationTitle')).toBeTruthy();
	expect(btn).toBeTruthy();
});

test('Test wrong route creation', () =>{
	const { getByText, getByRole } = render(<MapCreation routeManager={routeManager} />);

	const map = getByRole('presentation');
	const leftClick = { button: 1 };
	fireEvent.click(map, leftClick);

	const btn = getByText(/save/i);
	fireEvent.click(btn,leftClick);

});
