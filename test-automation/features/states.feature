Feature: States Feature - As a user, I should be able to access states API
  Scenario: As a user, I request [GET /api/states] to fetch all available states
    Given I request the API endpoint "/"
    When I make a GET request using "/api/states"
    Then I expect the http GET response code to be 200
    And I expect the response contains list of states
