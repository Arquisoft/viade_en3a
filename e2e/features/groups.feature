Feature: Group Management

Scenario: Create a group
  Given An already registered user at groups view
  When Creating a group
  Then The group is created

Scenario: Create a group with no people
  Given An already registered user at groups view
  When Creating a group without adding people
  Then A popup appears

Scenario: Create a group with no name
  Given An already registered user at groups view
  When Creating a group without setting a name
  Then A popup appears