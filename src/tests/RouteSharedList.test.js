import React from "react";
import { render } from "@testing-library/react";
import RouteManager from "./../model/RouteManager";
import RouteList from "./../pages/RouteList";
import MyRoute from "../model/MyRoute";
import RouteSharedList from "../pages/RouteSharedList";
import '@testing-library/jest-dom/extend-expect';
import i18n from '../i18n';

const routeManager = RouteManager;

test("renders learn react link", () => {
  const routeManager = RouteManager;
  const myRoute = new MyRoute(
      "Fuso de la Reina",
      "María santísima",
      "Easy to complete, mostly straight lines. Concrete does its job turning your knees into dust.",
      [{ lat: 2, lng: 4 }, { lat: 24, lng: 13 }],
      {}
  );
  routeManager.addSharedRoute(myRoute);

  const { getByText } = render(<RouteSharedList sync={false} routeManager={routeManager} />);
  const route1 = getByText(i18n.t("sharedRouteListTitle"));
  expect(route1).toBeInTheDocument();
});