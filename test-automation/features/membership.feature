Feature: Membership Integration Feature - As a user, I should be able to fetch a registered member using API

  Scenario: As a user, I request [GET /api/member] to find a non existing member by phone number
    Given I request the API endpoint "/"
    When I make a GET request using "/api/member?phone=1234567890"
    Then I expect the http GET response code to be 200
    And the members response should contain payload
    """
      {
        "members": []
      }
    """

  Scenario: As a user, I request [GET /api/member] to find a member by phone number
    Given I request the API endpoint "/"
    When I make a GET request using "/api/member?phone=9723756287"
    Then I expect the http GET response code to be 200
    And the members response should contain payload
    """
      {
        "members": [
          {
            "id": 1,
            "first": "Ravi",
            "last": "Kalli",
            "email": "ravi.kalli@gmail.com",
            "mobile": "9723756287",
            "membership": "Life"
          }
        ]
      }
    """

  Scenario: As a user, I request [GET /api/member] to find a member by email
    Given I request the API endpoint "/"
    When I make a GET request using "/api/member?email=ravi.kalli@gmail.com"
    Then I expect the http GET response code to be 200
    And the members response should contain payload
    """
      {
        "members": [
          {
            "id": 1,
            "first": "Ravi",
            "last": "Kalli",
            "email": "ravi.kalli@gmail.com",
            "mobile": "9723756287",
            "membership": "Life"
          }
        ]
      }
    """

  Scenario: As a user, I request [GET /api/member] to find a member by first & last name
    Given I request the API endpoint "/"
    When I make a GET request using "/api/member?firstName=Ravi&lastName=Kalli"
    Then I expect the http GET response code to be 200
    And the members response should contain payload
    """
      {
        "members": [
          {
            "id": 1,
            "first": "Ravi",
            "last": "Kalli",
            "email": "ravi.kalli@gmail.com",
            "mobile": "9723756287",
            "membership": "Life"
          }
        ]
      }
    """

  Scenario: As a user, I request [GET /api/member] to find a member by an invalid phone number format
    Given I request the API endpoint "/"
    When I make a GET request using "/api/member?phone=123abc3e5d"
    Then I expect the http GET response code to be 422
    And the errors response should contain payload
    """
      {
        "errors": {
          "phone": [
            "\"phone\" with value \"123abc3e5d\" fails to match the required pattern: /^^([\\d]{6}|((\\([\\d]{3}\\)|[\\d]{3})( [\\d]{3} |-[\\d]{3}-)))[\\d]{4}$$/"
           ]
        }
      }
    """

  Scenario: As a user, I request [GET /api/member] to find a member by an invalid email format
    Given I request the API endpoint "/"
    When I make a GET request using "/api/member?email=abd@"
    Then I expect the http GET response code to be 422
    And the errors response should contain payload
    """
      {
        "errors": {
          "email": [
            "\"email\" with value \"abd&#x40;\" fails to match the required pattern: /^(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$)$/"
          ]
        }
      }
    """
