import React from "react";
import { render } from "@testing-library/react";
import RouteManager from "./../model/RouteManager";
import RouteCard from "./../components/routeList/RouteCard";

const routeManager = new RouteManager();

test("renders route name text", () => {
  const { getByText } = render(<RouteCard route={routeManager.getRoutes()[0]} />);
  const creatorText = getByText(/Las Xanas/i);
  expect(creatorText).toBeInTheDocument();
});