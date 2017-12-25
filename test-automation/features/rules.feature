Feature: Rules Feature - As a user, I should be able to access rules API
  Scenario: As a user, I request [GET /api/rules] to fetch all available rules
    Given I request the API endpoint "/"
    When I make a GET request using "/api/rules"
    Then I expect the http GET response code to be 200
    And I expect the response contains list of rules

  Scenario Outline: As a user, I request [GET /api/rules/{courseName}] to fetch all available rules for a given course
    Given I request the API endpoint "/"
    When I make a GET request using "/api/rules/<courseName>"
    Then I expect the http GET response code to be 200
    And I expect the response contains list of rules for <courseName>

    Examples:
    | courseName  |
    | Inter       |
    | DA          |
    | Polytechnic |
    | PUC         |
    | BA          |
    | BBA         |
    | BBM         |
    | BCom        |
    | BDS         |
    | BE          |
    | MBBS        |
    | BPharmacy   |
    | BPT         |
    | BSc         |
    | AgBSc       |
    | BTech       |
    | MA          |
    | MBA         |
    | MCom        |
    | MCA         |
    | ME          |
    | MSc         |
    | CA          |

  Scenario Outline: As a user, I request [GET /api/rules/{courseId}/{academicYear}] to fetch all available rules for a given course and academicYear
    Given I request the API endpoint "/"
    When I make a GET request using "/api/courses/<courseName>"
    Then I expect the http GET response code to be 200
    And I use the courseId to fetch rules using "/api/rules/{courseId}/<academicYear>"
    And I expect the http GET response code to be 200
    And I expect the rules response contains list of rules for <courseName> and count to be <rulesCount>

    Examples:
    | courseName | academicYear | rulesCount |
    | Inter      | 1            | 1          |
    | Inter      | 2            | 2          |

  Scenario: As a user, I request [PUT /api/rules/{courseId}] to create new rule
    Given I request the API endpoint "/"
    When I make a GET request using "/api/courses/Inter"
    Then I expect the http GET response code to be 200
    And I make a rule PUT request using "/api/rules/{courseId}" with payload
    """
    {
      "rule": {
        "name": "Inter",
        "academicYear": 1,
        "requiredCourseDescription": "SSC New",
        "order": 2,
        "enabled": true
      }
    }
    """
    And I expect the http PUT response code to be 201
    And the rule response should contain a property "id"
    And the rule response should contain a property "course"
    And the rule response property "name" should be "Inter"
    And the rule response property "academicYear" should be 1
    And the rule response property "requiredCourseDescription" should be "SSC New"
    And the rule response property "order" should be 2
    And the rule response property "qualifiedMarks" should be 70
    And the rule response property "enabled" should be true

  Scenario: As a user, I request [PUT /api/rules/{courseId}] to create new rule with duplicate fields
    Given I request the API endpoint "/"
    When I make a GET request using "/api/courses/Inter"
    Then I expect the http GET response code to be 200
    And I make a rule PUT request using "/api/rules/{courseId}" with payload
    """
    {
      "rule": {
        "name": "Inter",
        "academicYear": 1,
        "requiredCourseDescription": "SSC New",
        "order": 2,
        "enabled": true
      }
    }
    """
    And I expect the http PUT response code to be 422
    And the errors response should contain payload
    """
      {
        "errors": {
          "academicYear": [ "'1' is already taken" ],
          "requiredCourseDescription": [ "'SSC New' is already taken" ],
          "order": [ "'2' is already taken" ]
        }
      }
    """

  Scenario: As a user, I request [PUT /api/rules/{courseId}] to create new rule with academicYear zero
    Given I request the API endpoint "/"
    When I make a GET request using "/api/courses/Inter"
    Then I expect the http GET response code to be 200
    And I make a rule PUT request using "/api/rules/{courseId}" with payload
    """
    {
      "rule": {
        "name": "Inter",
        "academicYear": 0,
        "requiredCourseDescription": "SSC New",
        "order": 2,
        "enabled": true
      }
    }
    """
    And I expect the http PUT response code to be 422
    And the errors response should contain payload
    """
      {
        "errors": {
          "academicYear": [ "\"academicYear\" must be greater than 0"]
        }
      }
    """

  Scenario: As a user, I request [PUT /api/rules/{courseId}] to create new rule with order zero
    Given I request the API endpoint "/"
    When I make a GET request using "/api/courses/Inter"
    Then I expect the http GET response code to be 200
    And I make a rule PUT request using "/api/rules/{courseId}" with payload
    """
    {
      "rule": {
        "name": "Inter",
        "academicYear": 1,
        "requiredCourseDescription": "SSC New",
        "order": 0,
        "enabled": true
      }
    }
    """
    And I expect the http PUT response code to be 422
    And the errors response should contain payload
    """
      {
        "errors": {
          "order": [ "\"order\" must be greater than 0"]
        }
      }
    """

  Scenario: As a user, I request [PUT /api/rules/{courseId}] to create new rule with invalid course id
    Given I request the API endpoint "/"
    When I make a GET request using "/api/courses/Inter"
    Then I expect the http GET response code to be 200
    And I make a rule PUT request using "/api/rules/junk_id" with payload
    """
    {
      "rule": {
        "name": "Inter",
        "academicYear": 1,
        "requiredCourseDescription": "SSC New",
        "order": 2,
        "enabled": true
      }
    }
    """
    And I expect the http PUT response code to be 400
    And the errors response should contain payload
    """
      {
        "errors": {
          "400": [ "Invalid course id" ]
        }
      }
    """

  Scenario: As a user, I request [PUT /api/rules/{courseId}] to create new rule with course id that is not existing
    Given I request the API endpoint "/"
    When I make a GET request using "/api/courses/Inter"
    Then I expect the http GET response code to be 200
    And I make a rule PUT request using "/api/rules/5a2b1f784af2a383c1361234" with payload
    """
    {
      "rule": {
        "name": "Inter",
        "academicYear": 1,
        "requiredCourseDescription": "SSC New",
        "order": 2,
        "enabled": true
      }
    }
    """
    And I expect the http PUT response code to be 404
    And the errors response should contain payload
    """
      {
        "errors": {
          "404": [ "Course not found" ]
        }
      }
    """

  Scenario: As a user, I request [POST /api/rules/{ruleId}] to update a rule
    Given I request the API endpoint "/"
    When I make an UPDATE request using "/api/rules/{id}" with payload
    """
    {
      "rule": {
        "name": "Inter",
        "academicYear": 1,
        "requiredCourseDescription": "SSC New",
        "order": 2,
        "enabled": false
      }
    }
    """
    Then I expect the http POST response code to be 200
    And the rule response property "name" should be "Inter"
    And the rule response property "academicYear" should be 1
    And the rule response property "requiredCourseDescription" should be "SSC New"
    And the rule response property "order" should be 2
    And the rule response property "qualifiedMarks" should be 70
    And the rule response property "enabled" should be false

  Scenario: As a user, I request [POST /api/rules/{ruleId}] to update a rule with invalid id
    Given I request the API endpoint "/"
    When I make an UPDATE request using "/api/rules/junk_id" with payload
    """
    {
      "rule": {
        "name": "Inter",
        "academicYear": 1,
        "requiredCourseDescription": "SSC New",
        "order": 2,
        "enabled": false
      }
    }
    """
    Then I expect the http POST response code to be 400
    And the errors response should contain payload
    """
      {
        "errors": {
          "400": [ "Invalid rule id" ]
        }
      }
    """

  Scenario: As a user, I request [POST /api/rules/{ruleId}] to update a rule that is not existing
    Given I request the API endpoint "/"
    When I make an UPDATE request using "/api/rules/5a2b1f784af2a383c1361234" with payload
    """
    {
      "rule": {
        "name": "Inter",
        "academicYear": 1,
        "requiredCourseDescription": "SSC New",
        "order": 2,
        "enabled": false
      }
    }
    """
    Then I expect the http POST response code to be 404
    And the errors response should contain payload
    """
      {
        "errors": {
          "404": [ "Rule not found" ]
        }
      }
    """

  Scenario: As a user, I request [DELETE /api/rules/{id}] to delete a rule
    Given I request the API endpoint "/"
    When I make a DELETE request using "/api/rules/{id}"
    Then I expect the http DELETE response code to be 204
    And I expect the response is empty

  Scenario: As a user, I request [DELETE /api/rules/{id}] to delete a rule with invalid id
    Given I request the API endpoint "/"
    When I make a DELETE request using "/api/rules/junk_id"
    Then I expect the http DELETE response code to be 400
    And the errors response should contain payload
    """
      {
        "errors": {
          "400": [ "Invalid rule id" ]
        }
      }
    """

  Scenario: As a user, I request [DELETE /api/rules/{id}] to delete a rule that is not existing
    Given I request the API endpoint "/"
    When I make a DELETE request using "/api/rules/5a2b1f784af2a383c1361234"
    Then I expect the http DELETE response code to be 404
    And the errors response should contain payload
    """
      {
        "errors": {
          "404": [ "Rule not found" ]
        }
      }
    """
