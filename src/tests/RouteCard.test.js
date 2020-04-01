import React from "react";
import { render } from "@testing-library/react";
import MyRoute from "./../model/MyRoute";
import RouteCard from "./../components/routeList/RouteCard";


test("renders route name text", () => {
  const myRoute = new MyRoute(
    "Fuso de la Reina",
    "María santísima",
    "Easy to complete, mostly straight lines. Concrete does its job turning your knees into dust.",
    [{ lat: 0, lng: 2 }, { lat: 1, lng: 1 }],
    {}
  );
  const { getByText } = render(<RouteCard route={myRoute} />);
  const creatorText = getByText(/Fuso de la Reina/i);
  expect(creatorText).toBeInTheDocument();
});