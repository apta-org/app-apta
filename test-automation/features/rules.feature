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
