Feature: Basic access to the application

Scenario: Login to an account
  Given An unlogged user with account
  When I click Log in
  Then I should be logged in
