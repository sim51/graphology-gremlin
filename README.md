# Gremlin DSL for graphology [![CI](https://github.com/sim51/graphology-gremlin/actions/workflows/test.yml/badge.svg)](https://github.com/sim51/graphology-gremlin/actions/workflows/test.yml)

This project allows you to do Gremlin queries on top of a graphology instance.
For now the project is in alpha, but it already support a good part of the Gremlin langage.

Please open a ticket on github if something is missing or not working, it will help me a lot !
Thanks.

## How to use it 

* Install the library

```bash
$> npm install graphology-gremlin
```

* Import it in your script 

```typescript
import { GraphTraversalSource } from "graphology-gremlin";
```

* Create a `GraphTraversalSource` with your graph (a graphology instance)

```typescript
const g = new GraphTraversalSource(graph);
```

* Make your Gremlin query with the created `GraphTraversalSource`

```typescript
const result = g.V().out("KNOWS").toList();
```
