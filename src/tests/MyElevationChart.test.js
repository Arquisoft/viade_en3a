import { render } from "@testing-library/react";
import React from "react";
import MyElevationChart from "../components/myElevationChart/MyElevationChart";
import MyRoute from "./../model/MyRoute";

test('Test elevation chart', () => {

    const myRoute = new MyRoute(
        "Fuso de la Reina",
        "María santísima",
        "Easy to complete, mostly straight lines. Concrete does its job turning your knees into dust.",
        [{ lat: 0, lng: 2 }, { lat: 1, lng: 1 }],
        {}
    );

    const { getByTestId } = render(<div data-testid="test" ><MyElevationChart route={myRoute} /></div>);

    expect(getByTestId("test")).toHaveAttribute("data-testid", "test");

});