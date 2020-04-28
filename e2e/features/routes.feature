Feature: Route Management

Scenario: Create a route
  Given An already registered user at route creation view
  When Creating a route
  Then The route is created

Scenario: Error popup when no title
  Given An already registered user at route creation view
  When Creating a route with no title
  Then The route is not created and a popup appears

Scenario: Error popup when no points
  Given An already registered user at route creation view
  When Creating a route with no points
  Then The route is not created and a popup appears


Scenario: Error popups with no data at all
  Given An already registered user at route creation view
  When Creating a route with no data
  Then The route is not created and two popups appear