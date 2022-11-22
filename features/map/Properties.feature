# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.

@StepClassMap @StepProperties
Feature: Step - properties()

  Scenario: g_V_hasXageX_propertiesXnameX
    Given the modern graph
    And the traversal of
      """
      g.V().has("age").properties("name").value()
      """
    When iterated to list
    Then the result should be unordered
      | result |
      | marko |
      | vadas |
      | josh  |
      | peter |

  Scenario: g_V_hasXageX_propertiesXname_ageX_value
    Given the modern graph
    And the traversal of
      """
      g.V().has("age").properties("name", "age").value()
      """
    When iterated to list
    Then the result should be unordered
      | result |
      | marko |
      | d[29].i |
      | vadas |
      | d[27].i |
      | josh  |
      | d[32].i |
      | peter |
      | d[35].i |

  Scenario: g_V_hasXageX_propertiesXage_nameX_value
    Given the modern graph
    And the traversal of
      """
      g.V().has("age").properties("age", "name").value()
      """
    When iterated to list
    Then the result should be unordered
      | result |
      | marko |
      | d[29].i |
      | vadas |
      | d[27].i |
      | josh  |
      | d[32].i |
      | peter |
      | d[35].i |

  Scenario: g_V_propertiesXname_age_nullX_value
    Given the modern graph
    And the traversal of
      """
      g.V().properties("name", "age", null).value()
      """
    When iterated to list
    Then the result should be unordered
      | result |
      | marko |
      | d[29].i |
      | vadas |
      | d[27].i |
      | josh  |
      | d[32].i |
      | peter |
      | d[35].i |
      | lop |
      | ripple |

  Scenario: g_V_valuesXname_age_nullX
    Given the modern graph
    And the traversal of
      """
      g.V().values("name", "age", null)
      """
    When iterated to list
    Then the result should be unordered
      | result |
      | marko |
      | d[29].i |
      | vadas |
      | d[27].i |
      | josh  |
      | d[32].i |
      | peter |
      | d[35].i |
      | lop |
      | ripple |

  Scenario: g_injectXg_VX1X_propertiesXnameX_nextX_value
    Given an unsupported test
    Then nothing should happen because
      """
      The test suite doesn't do well with vertex property values.
      """

  Scenario: g_V_hasXageX_properties_hasXid_nameIdX_value
    Given an unsupported test
    Then nothing should happen because
      """
      GLV suite doesn't support property identifiers and related assertions
      """

  Scenario: g_V_hasXageX_properties_hasXid_nameIdAsStringX_value
    Given an unsupported test
    Then nothing should happen because
      """
      GLV suite doesn't support property identifiers and related assertions
      """