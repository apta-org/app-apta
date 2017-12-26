Feature: Courses Feature - As a user, I should be able to access courses API
  Scenario: As a user, I request [GET /api/courses] to fetch all available courses
    Given I request the API endpoint "/"
    When I make a GET request using "/api/courses"
    Then I expect the http GET response code to be 200
    And I expect the response contains list of courses

  Scenario: As a user, I request [PUT /api/courses] to create new course
    Given I request the API endpoint "/"
    When I make a course PUT request using "/api/courses" with payload
    """
    {
      "course": {
        "name": "CRC",
        "description": "New Course",
        "length": 5,
        "rank": 100,
        "minimumMarks": 70,
        "allowedForProgram": false
      }
    }
    """
    Then I expect the http PUT response code to be 201
    And the course response should contain a property "id"
    And the course response property "name" should be "CRC"
    And the course response property "description" should be "New Course"
    And the course response property "length" should be 5
    And the course response property "rank" should be 100

  Scenario: As a user, I request [PUT /api/courses] to create new course with duplicate fields
    Given I request the API endpoint "/"
    When I make a course PUT request using "/api/courses" with payload
    """
    {
      "course": {
        "name": "CRC",
        "description": "New Course",
        "length": 5,
        "rank": 100,
        "minimumMarks": 70,
        "allowedForProgram": false
      }
    }
    """
    Then I expect the http PUT response code to be 422
    And the errors response should contain payload
    """
      {
        "errors": {
          "name": [ "'CRC' is already taken" ],
          "description": [ "'New Course' is already taken" ],
          "rank": [ "'100' is already taken" ]
        }
      }
    """

  Scenario: As a user, I request [PUT /api/courses] to create new course with length zero
  Given I request the API endpoint "/"
  When I make a course PUT request using "/api/courses" with payload
    """
    {
      "course": {
        "name": "CRC1",
        "description": "New Course1",
        "length": 0,
        "rank": 200,
        "minimumMarks": 70,
        "allowedForProgram": false
      }
    }
    """
  Then I expect the http PUT response code to be 422
  And the errors response should contain payload
    """
      {
        "errors": {
          "length": [ "\"length\" must be greater than 0" ]
        }
      }
    """

  Scenario: As a user, I request [PUT /api/courses] to create new course with rank zero
    Given I request the API endpoint "/"
    When I make a course PUT request using "/api/courses" with payload
    """
    {
      "course": {
        "name": "CRC1",
        "description": "New Course1",
        "length": 4,
        "rank": 0,
        "minimumMarks": 70,
        "allowedForProgram": false
      }
    }
    """
    Then I expect the http PUT response code to be 422
    And the errors response should contain payload
    """
      {
        "errors": {
          "rank": [ "\"rank\" must be greater than 0" ]
        }
      }
    """

  Scenario: As a user, I request [PUT /api/courses] to create new course with minimumMarks zero
    Given I request the API endpoint "/"
    When I make a course PUT request using "/api/courses" with payload
    """
    {
      "course": {
        "name": "CRC1",
        "description": "New Course1",
        "length": 4,
        "rank": 100,
        "minimumMarks": 0,
        "allowedForProgram": false
      }
    }
    """
    Then I expect the http PUT response code to be 422
    And the errors response should contain payload
    """
      {
        "errors": {
          "minimumMarks": [ "\"minimumMarks\" must be greater than 0" ]
        }
      }
    """

  Scenario: As a user, I request [PUT /api/courses] to create new course with invalid allowedForProgram
    Given I request the API endpoint "/"
    When I make a course PUT request using "/api/courses" with payload
    """
    {
      "course": {
        "name": "CRC1",
        "description": "New Course1",
        "length": 4,
        "rank": 100,
        "minimumMarks": 70,
        "allowedForProgram": "illegal"
      }
    }
    """
    Then I expect the http PUT response code to be 422
    And the errors response should contain payload
    """
      {
        "errors": {
          "allowedForProgram": [ "\"allowedForProgram\" must be a boolean" ]
        }
      }
    """

  Scenario: As a user, I request [PUT /api/courses] to create new course with missing allowedForProgram
    Given I request the API endpoint "/"
    When I make a course PUT request using "/api/courses" with payload
    """
    {
      "course": {
        "name": "CRC1",
        "description": "New Course1",
        "length": 4,
        "rank": 100,
        "minimumMarks": 70
      }
    }
    """
    Then I expect the http PUT response code to be 422
    And the errors response should contain payload
    """
      {
        "errors": {
          "allowedForProgram": [ "\"allowedForProgram\" is required" ]
        }
      }
    """

  Scenario: As a user, I request [POST /api/courses] to update a course
    Given I request the API endpoint "/"
    When I make a GET request using "/api/courses/CRC"
    Then I expect the http GET response code to be 200
    And the course response should contain a property "id"
    And I make an UPDATE request using "/api/courses/{id}" with payload
    """
    {
      "course": {
        "name": "CRC",
        "description": "New Course 1",
        "length": 5,
        "rank": 100,
        "minimumMarks": 70,
        "allowedForProgram": true
      }
    }
    """
    And I expect the http POST response code to be 200
    And the course response should not contain a property "id"
    And the course response property "name" should be "CRC"
    And the course response property "description" should be "New Course 1"
    And the course response property "length" should be 5
    And the course response property "rank" should be 100
    And the course response property "minimumMarks" should be 70
    And the course response property "allowedForProgram" should be true

  Scenario: As a user, I request [POST /api/courses] to update a course with invalid id
    Given I request the API endpoint "/"
    When I make an UPDATE request using "/api/courses/junk_id" with payload
    """
    {
      "course": {
        "name": "CRC",
        "description": "New Course 1",
        "length": 5,
        "rank": 100,
        "minimumMarks": 70,
        "allowedForProgram": false
      }
    }
    """
    Then I expect the http POST response code to be 400
    And the errors response should contain payload
    """
      {
        "errors": {
          "400": [ "Invalid course id" ]
        }
      }
    """

  Scenario: As a user, I request [POST /api/courses] to update a course that is not existing
    Given I request the API endpoint "/"
    When I make an UPDATE request using "/api/courses/5a2b1f784af2a383c1361234" with payload
    """
    {
      "course": {
        "name": "CRC",
        "description": "New Course 1",
        "length": 5,
        "rank": 100,
        "minimumMarks": 70,
        "allowedForProgram": false
      }
    }
    """
    Then I expect the http POST response code to be 404
    And the errors response should contain payload
    """
      {
        "errors": {
          "404": [ "Course not found" ]
        }
      }
    """

  Scenario: As a user, I request [DELETE /api/courses/{id}] to delete a course
    Given I request the API endpoint "/"
    When I make a GET request using "/api/courses/CRC"
    Then I expect the http GET response code to be 200
    And the course response should contain a property "id"
    And I make a DELETE request using "/api/courses/{id}"
    And I expect the http DELETE response code to be 204
    And I expect the response is empty


  Scenario: As a user, I request [DELETE /api/courses/{id}] to delete a course with invalid id
    Given I request the API endpoint "/"
    When I make a DELETE request using "/api/courses/junk_id"
    Then I expect the http DELETE response code to be 400
    And the errors response should contain payload
    """
      {
        "errors": {
          "400": [ "Invalid course id" ]
        }
      }
    """

  Scenario: As a user, I request [DELETE /api/courses/{id}] to delete a course that is not existing
    Given I request the API endpoint "/"
    When I make a DELETE request using "/api/courses/5a2b1f784af2a383c1361234"
    Then I expect the http DELETE response code to be 404
    And the errors response should contain payload
    """
      {
        "errors": {
          "404": [ "Course not found" ]
        }
      }
    """

