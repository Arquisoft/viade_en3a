import React from "react";
import App from "./../App";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test('Test Application initial render', () => {
    const { getByTestId } = render(<div data-testid="test" ><App /></div>);
    expect(getByTestId("test")).toHaveAttribute("data-testid", "test");
});