Feature: [GET /] Swagger API Documentation
  Scenario: As a user, I request for the API documentation
    Given I open the site "/"
    Then I expect the http response code to be 200
    And I expect the API documentation to be present
