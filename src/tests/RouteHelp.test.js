import React from "react";
import { render } from "@testing-library/react";
import RouteHelp from "./../pages/RouteHelp.js";

test("renders help index", () => {
  const { getByText } = render(<RouteHelp />);
  const indexText = getByText('routeHelpIndex');
  expect(indexText).toBeInTheDocument();
});