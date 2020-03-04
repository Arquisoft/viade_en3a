import React from 'react';
import { render } from '@testing-library/react';
import RouteList from './RouteList';

test('renders learn react link', () => {
    const { getByText } = render(<RouteList />);
    const route1 = getByText(/Las Xanas/i);
    expect(route1).toBeInTheDocument();
  });