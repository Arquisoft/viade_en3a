Feature: Basic access to the views of the application

Scenario: Access the route list correctly
  Given A logged in user
  When Navigating to my routes
  Then He is at /routes/list

Scenario: Access the route creation correctly
  Given A logged in user
  When Navigating to route creation
  Then He is at /routes/add

Scenario: Access the route shared routes correctly
  Given A logged in user
  When Navigating to shared route
  Then He is at /routes/shared
