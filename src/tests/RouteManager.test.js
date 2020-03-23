import '@testing-library/jest-dom/extend-expect';
import RouteManager from "./../model/RouteManager";
import RouteCreator from "./../model/RouteCreator";
import assert from 'assert';

test('Test add route to manager', () => {
    const routeManager = new RouteManager();
    const route = new RouteCreator().createRoute("test", [[0, 2], [1, 1]]);
    routeManager.addRoute(route);
    const routes = routeManager.getRoutes();
    const created = routes[routes.length - 1];

    assert.equal(created.name, route.name, "Route not equal");

    //check also getRouteById
    const found = routeManager.getRouteById(created.id);
    assert.equal(found.name, created.name);
});
