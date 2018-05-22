Feature: Students Feature - As a user, I should be able to access students API
  Scenario: As a user, I request [POST /api/students] to create new student
    Given I request the API endpoint "/"
    When I make a student POST request using "/api/students" with payload
    """
    {
      "student": {
        "firstName": "TestFirst",
        "lastName": "TestLast",
        "email": "test.test@test.com"
      }
    }
    """
    Then I expect the http PUT response code to be 201
    And the student response should contain a property "id"
    And the student response property "firstName" should be "TESTFIRST"
    And the student response property "lastName" should be "TESTLAST"
    And the student response property "email" should be "test.test@test.com"
#    And the course response property "rank" should be 100
