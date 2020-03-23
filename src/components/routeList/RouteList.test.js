import React from 'react';
import { render } from '@testing-library/react';
import RouteList from './RouteList';
import RouteManager from "../../model/RouteManager";

const routeManager = new RouteManager();

test('renders learn react link', () => {
  const { getByText } = render(<RouteList routeManager={routeManager}/>);
  const route1 = getByText(/Las Xanas/i);
  expect(route1).toBeInTheDocument();
});