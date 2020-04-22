import React from "react";
import { render } from "@testing-library/react";
import RouteManager from "./../model/RouteManager";
import RouteList from "./../pages/RouteList";

const routeManager = RouteManager;

test("renders learn react link", () => {
  const { getByText } = render(<RouteList routeManager={routeManager} />);
  const route1 = getByText('routeListText');
  expect(route1).toBeInTheDocument();
});