import React from "react";
import { render } from "@testing-library/react";
import RouteManager from "./../model/RouteManager";
import RouteList from "../components/routeList/RouteList";

const routeManager = new RouteManager();

test("renders learn react link", () => {
  const { getByText } = render(<RouteList routeManager={routeManager} />);
  const route1 = getByText(/Route list/i);
  expect(route1).toBeInTheDocument();
});