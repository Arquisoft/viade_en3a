Feature: Access the application

Scenario: The user is registered in the site
  Given An already registered user
  When I click the sign in button and access with my credentials
  Then A welcome message should be shown in the screen with my name
