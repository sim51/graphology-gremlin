# Gremlin DSL for graphology [![CI](https://github.com/sim51/graphology-gremlin/actions/workflows/test.yml/badge.svg)](https://github.com/sim51/graphology-gremlin/actions/workflows/test.yml)

## TODO

- Avoid cycles ?? => before to traverse an edge need to check if it is the traversed path
  \*\* In the traverser, storing the traversed path ???
- Graph config : default is a graph without labels and types ?

- Conditional types in typescript to have a better type flow ?
  Should return an array of `Vertex` and not `Vertex | Edge | Object` (ex: hasKey step)

```
g
  .V()
  .hasId(nodeId)
  .hasKey("name")
```

- Omit config field when creating Edge / Vertex
  => static function with config, id, props

* group with projection
* has filter step
* predicate + where clauses + as
* explain / profile
* step scope (ex count)
