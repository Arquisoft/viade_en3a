import React from "react";
import { render } from "@testing-library/react";
import RouteManager from "./../model/RouteManager";
import RouteList from "./../pages/RouteList";
import i18n from '../i18n';

const routeManager = RouteManager;

test("renders learn react link", () => {
  const { getByText } = render(<RouteList routeManager={routeManager} />);
  const route1 = getByText(i18n.t('routeListText'));
  expect(route1).toBeInTheDocument();
});