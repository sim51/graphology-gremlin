# Gremlin DSL for graphology [![CI](https://github.com/sim51/graphology-gremlin/actions/workflows/test.yml/badge.svg)](https://github.com/sim51/graphology-gremlin/actions/workflows/test.yml)

## TODO

- Create correct wrapper object for Vertex & Edge
- Avoid cycles ?? => before to traverse an edge need to check if it is the traversed path
  \*\* In the traverser, storing the traversed path ???
- Graph config : default is a graph without labels and types ?

- Conditional types in typescript to have a better type flow ?
  Should return an array of `Vertex` and not `Vertex | Edge | Object` (due to the hasKey step)

```
g
  .V()
  .hasId(nodeId)
  .hasKey("name")
```

- Omit config field when creating Edge / Vertex
  => static function with config, id, props

* predicate + has filter step