import '@testing-library/jest-dom/extend-expect';
import RouteManager from "./../model/RouteManager";
import MyRoute from "./../model/MyRoute";
import assert from 'assert';

test('Test add route to manager', () => {
    const routeManager = new RouteManager();
    const myRoute = new MyRoute(
        "Fuso de la Reina",
        "María santísima",
        "Easy to complete, mostly straight lines. Concrete does its job turning your knees into dust.",
        [{ lat: 2, lng: 4 }, { lat: 24, lng: 13 }],
        {}
    );
    routeManager.addRoute(myRoute);
    routeManager.addRoute(myRoute);
    const routes = routeManager.getRoutes();
    const created = routes[routes.length - 1];

    assert.equal(created.getName(), myRoute.getName(), "Route not equal");
    assert.notEqual(myRoute.getDescription(), undefined, "Description is undefined");
    assert.notEqual(myRoute.getWaypoints(), undefined, "Points are undefined");
    assert.notEqual(myRoute.getWaypoints()[0].getAltitude(), undefined, "Some point altitude is undefined");

    //check also getRouteById
    const found = routeManager.getRouteById(created.getId());
    assert.equal(found.getName(), created.getName());
});