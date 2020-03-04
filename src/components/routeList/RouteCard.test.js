import React from 'react';
import { render } from '@testing-library/react';
import RouteCard from './RouteCard';

test('renders creator text', () => {
    const { getByText } = render(<RouteCard />);
    const creatorText = getByText(/creator/i);
    expect(creatorText).toBeInTheDocument();
  });