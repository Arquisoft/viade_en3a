import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {findRenderedDOMComponentWithClass} from "react-dom/test-utils";

test('renders learn react link', () => {
  const { getByText, tree } = render(<App />);
  /*
  const linkElement = getByText(/You are not logged in, and this is a members-only area!/i);
  expect(linkElement).toBeInTheDocument();
  */

  let e = findRenderedDOMComponentWithClass(tree ,"App");

  expect(e).toBeInTheDocument();
});
