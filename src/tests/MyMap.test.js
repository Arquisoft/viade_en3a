import React from "react";
import MyMap from "../components/myMap/MyMap";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MyRoute from "./../model/MyRoute";
import { boldRoutePoints } from "./../components/routeList/Points";

test("Test add route", () => {

	const myRoute = new MyRoute(
		"Fuso de la Reina",
		"María santísima",
		"Easy to complete, mostly straight lines. Concrete does its job turning your knees into dust.",
		boldRoutePoints,
		{}
	);

	const { getByTestId } = render(<div data-testid="test" ><MyMap route={myRoute} zoom={13} /></div>);

	expect(getByTestId("test")).toHaveAttribute("data-testid", "test");

});
