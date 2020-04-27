Feature: Access the application

Scenario: Access the main view of the App
  Given A new unregistered user
  When Accessing the App
  Then The carousel loads


Scenario: Change App Language
  Given A user in the main view
  When Pressing the change language button
  Then Language should change
