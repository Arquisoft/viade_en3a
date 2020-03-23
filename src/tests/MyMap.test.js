import React from "react";
import MyMap from "../components/myMap/MyMap";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RouteCreator from "./../model/RouteCreator";

test("Test add route", () => {

	const points = [[43.211820, -5.787902],
	[43.210796, -5.786690],
	[43.210082, -5.785064],
	[43.209800, -5.783841],
	[43.210121, -5.782339],
	[43.210379, -5.780773],
	[43.209754, -5.777683]];

	const myRoute = new RouteCreator().createRoute("prueba", points);

	const { getByTestId } = render(<div data-testid="test" ><MyMap route={myRoute} zoom={13} /></div>);

	expect(getByTestId("test")).toHaveAttribute("data-testid", "test");

});
