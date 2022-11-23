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

@GraphComputerOnly @StepClassMap @StepPeerPressure
Feature: Step - peerPressure()
                
  Scenario: g_V_peerPressure_hasXclusterX
    Given the modern graph
    And the traversal of
      """
      g.V().peerPressure().has("gremlin.peerPressureVertexProgram.cluster")
      """
    When iterated to list
    Then the result should be unordered
      | result |
      | v[marko] |
      | v[vadas] |
      | v[lop] |
      | v[josh] |
      | v[ripple] |
      | v[peter] |

  Scenario: g_V_peerPressure_withXpropertyName_clusterX_withXedges_outEXknowsXX_pageRankX1X_byXrankX_withXedges_outEXknowsX_withXtimes_2X_group_byXclusterX_byXrank_sumX_limitX100X
    Given the modern graph
    And the traversal of
      """
      g.V().peerPressure().with("~tinkerpop.peerPressure.propertyName","cluster").with("~tinkerpop.peerPressure.edges",__.outE("knows")).pageRank(1.0).with("~tinkerpop.pageRank.propertyName", "rank").with("~tinkerpop.pageRank.edges", __.outE("knows")).with("~tinkerpop.pageRank.times", 1).group().by("cluster").by(__.values("rank").sum()).limit(100)
      """
    When iterated to list
    Then the result should be unordered
      | result |
      | m[{"d[1].i":"d[0.5833333333333333].d","d[3].i":"d[0.1388888888888889].d","d[5].i":"d[0.1388888888888889].d","d[6].i":"d[0.1388888888888889].d"}] |

  Scenario: g_V_hasXname_rippleX_inXcreatedX_peerPressure_withXedges_outEX_withyXpropertyName_clusterX_repeatXunionXidentity__bothX_timesX2X_dedup_valueMapXname_clusterX
    Given the modern graph
    And the traversal of
      """
      g.V().has("name", "ripple").in("created").peerPressure().with("~tinkerpop.peerPressure.edges",__.outE()).with("~tinkerpop.peerPressure.propertyName", "cluster").repeat(__.union(__.identity(), __.both())).times(2).dedup().valueMap("name", "cluster")
      """
    When iterated to list
    Then the result should be unordered
      | result |
      | m[{"name": ["marko"], "cluster": [1]}] |
      | m[{"name": ["vadas"], "cluster": [2]}] |
      | m[{"name": ["lop"], "cluster": [4]}] |
      | m[{"name": ["josh"], "cluster": [4]}] |
      | m[{"name": ["ripple"], "cluster": [4]}] |
      | m[{"name": ["peter"], "cluster": [6]}] |

