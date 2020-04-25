import '@testing-library/jest-dom/extend-expect';
import RouteManager from "./../model/RouteManager";
import MyRoute from "./../model/MyRoute";
import assert from 'assert';

test('Test add route to manager', () => {
    const routeManager = RouteManager;
    const myRoute = new MyRoute(
        "Fuso de la Reina",
        "María santísima",
        "Easy to complete, mostly straight lines. Concrete does its job turning your knees into dust.",
        [{ lat: 2, lng: 4 }, { lat: 24, lng: 13 }],
        {}
    );
    myRoute.addMedia(null);

    let jsonLd = myRoute.toJsonLd();

    const route = new MyRoute("","","",[]);
    route.modifyFromJsonLd(JSON.parse(jsonLd));

    const string1 = myRoute.getComparableString();
    const string2 = route.getComparableString();
    assert.equal(string1,string2,"Route comparable string equal");

    routeManager.addRoute(myRoute);
    routeManager.addRoute(myRoute);
    const routes = routeManager.getRoutes();
    const created = routes[routes.length - 1];

    assert.equal(created.getName(), myRoute.getName(), "Route not equal");
    assert.notEqual(myRoute.getDescription(), undefined, "Description is undefined");
    assert.notEqual(myRoute.getPoints(), undefined, "Points are undefined");
    assert.notEqual(myRoute.getPoints()[0].getElevation(), undefined, "Some point elevation is undefined");

    //check also getRouteById
    const found = routeManager.getRouteById(created.getId());
    assert.equal(found.getName(), created.getName());
});