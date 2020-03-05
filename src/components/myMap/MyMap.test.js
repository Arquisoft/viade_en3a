import React from 'react';
import { render } from '@testing-library/react';
import MyMap from './MyMap';
import Route from './Route';

test('Test add route', () => {

	const points= [[43.211820, -5.787902],
			[43.210796, -5.786690],
			[43.210082, -5.785064],
			[43.209800, -5.783841],
			[43.210121, -5.782339],
			[43.210379, -5.780773],
			[43.209754, -5.777683]]; 
 const {map} = render(<MyMap route={new Route(points)} zoom= {13}  />);
   
});
 