import React from 'react';
import { render } from '@testing-library/react';
import RouteCard from '../components/routeList/RouteCard';

test('renders creator text', () => {
  const { getByText } = render(<RouteCard routePoints={[[0, 0], [3, 3]]} routeName='a' routeDescription='creator' />);
  const creatorText = getByText(/creator/i);
  expect(creatorText).toBeInTheDocument();
});