import React from 'react';
import RouteCreation from './../pages/RouteCreation';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RouteManager from "./../model/RouteManager";

import i18n from '../i18n';
const routeManager = RouteManager;

test('Test create route', () => {
	const { getByText, getByRole } = render(<RouteCreation routeManager={routeManager} />);

	getByRole('presentation');

	const title = getByText(i18n.t('mapCreationTitle'));
	const leftClick = { button: 1 };
	fireEvent.click(title, leftClick);
	fireEvent.keyDown(title, { key: 'A' });

	const btn = getByText(/save/i);

	expect(getByText(i18n.t('mapCreationTitle'))).toBeTruthy();
	expect(btn).toBeTruthy();
});

test('Test wrong route creation', () => {
	const { getByText, getByRole } = render(<RouteCreation routeManager={routeManager} />);

	getByRole('presentation');
	const leftClick = { button: 1 };

	const btn = getByText(/save/i);
	fireEvent.click(btn, leftClick);

});
