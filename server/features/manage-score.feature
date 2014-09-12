Feature: A score belongs to a match between two teams
  I can update the score of the home team or of the guest team

  Background: Prepare the score
    Given a initial score
    Then the score of the "home" team should be 0
    And the score of the "guest" team should be 0

  Scenario Outline: Scoring a valid basket
    When <offense team> team scores a basket of <points> points
    Then the score of the <offense team> team should be <offense score> 
      And the score of the <defense team> team should be <defense score>
    
      Examples:
        | offense team | defense team | points | offense score | defense score |
        | "home"       | "guest"      | 1      | 1             | 0             |
        | "guest"      | "home"       | 2      | 2             | 0             |
        | "home"       | "guest"      | 3      | 3             | 0             |
        
        
  Scenario Outline: Scoring a invalid point basket
    When <offense team> team scores a basket of <points> points
    Then the score of the <offense team> team should be <offense score> 
      And the score of the <defense team> team should be <defense score>
    
      Examples:
        | offense team | defense team | points  | offense score | defense score |
        | "home"       | "guest"      | 4       | 0             | 0             |
        | "guest"      | "home"       | -1      | 0             | 0             |
        | "guest"      | "home"       | 1.2     | 0             | 0             |
        | "guest"      | "home"       | invalid | 0             | 0             |

  Scenario: Scoring with a invalid team name
    When "GUEST" team scores a basket of 2 points
    Then the score of the "guest" team should be 0 
      And the score of the "home" team should be 0
    
  Scenario: Scoring two valid baskets
    When "guest" team scores a basket of 3 points
    Then the score of the "guest" team should be 3
      And the score of the "home" team should be 0
    When "guest" team scores a basket of 1 points
    Then the score of the "guest" team should be 4
      And the score of the "home" team should be 0
    
  Scenario Outline: Set the team score (valid and invalid cases)
        Sometimes mistakes happen scoring a basket that
        I should be able to fix them
      When I set the score of the <offense team> team to <points>
      Then the score of the <offense team> team should be <offense score>
        And the score of the <defense team> team should be <defense score>
      
      Examples:
        | offense team | defense team | points  | offense score | defense score |
        | "home"       | "guest"      | 30      | 30            | 0             |
        | "guest"      | "home"       | 23      | 23            | 0             |
        | "guest"      | "home"       | 2.3     | 0             | 0             |
