Feature: Access the application

Scenario: Edit profile info
  Given An already registered user on the profile page
  When I click the edit profile button
  Then The edit profile page appears
