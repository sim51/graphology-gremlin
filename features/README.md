# Features

This folder is mainly a copy of this one : https://github.com/apache/tinkerpop/tree/master/gremlin-test/features

So here we've got all the feature tested by the gremlin project.
If this project succeed to run all those features, we can says this project is a true implementation of Gremlin.

To run all those features, you need to call `npm run test:tck` (tck means test compliance kit).

The folder `step_definitions` contains some local code for cucumber.

NOTE: we use graphml files to import "gremlin's graph". Those files are located in `/test/assets` folder and comes from this url https://github.com/apache/tinkerpop/tree/master/gremlin-test/src/main/resources/org/apache/tinkerpop/gremlin/structure/io/graphml
