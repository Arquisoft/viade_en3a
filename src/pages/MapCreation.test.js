import React from 'react';
import MapCreation from './MapCreation.js';
import { render, getByTestId, getByRole, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('Test create route', () => {
	const { getByText, getByRole } = render(<MapCreation />);

	const map = getByRole('presentation');
	const leftClick = { button: 1 };
	fireEvent.click(map, leftClick);

	const title = getByRole('title');
	fireEvent.click(title, leftClick);
	fireEvent.keyDown(title, { key: 'A' });

	const btn = getByText('Save');
	fireEvent.click(btn, leftClick);

	expect(getByText("Create your own Route")).toBeTruthy();
});
