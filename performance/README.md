# JSON P3 Benchmarks

A comparison of JSONPath parsing and evaluation performance between version 2.3.2 and version 3.0.0. Note that version 3 introduced a "basic" evaluation mode which does not track node locations.

All benchmarks are run on an M2 Mac Mini with Node v26.1.0 and Bun 1.4.2.

## The benchmarks

- `bench_cts.mjs` measures ops per second, where one op is all valid JSONPath query expressions from the JSONPath Compliance Test Suite. These are all small queries on very small data.

- `bench_citylots.mjs` measures total query evaluation time for each of a handful of queries on larger data. We use data from https://github.com/zemirco/sf-city-lots-json and queries from https://github.com/andykais/json-querying-performance-testing, with the addition of a regex conditional query.

### Valid CTS Queries

#### Version 2.3.2 - Node JS

```
┌─────────┬────────────────────┬────────────────────────┬─────────┐
│ (index) │ Task name          │ Throughput avg (ops/s) │ Samples │
├─────────┼────────────────────┼────────────────────────┼─────────┤
│ 0       │ 'parse'            │ '3250 ± 0.06%'         │ 32377   │
│ 1       │ 'parse and eval'   │ '1046 ± 0.08%'         │ 10433   │
│ 2       │ 'just eval'        │ '1591 ± 0.06%'         │ 15882   │
└─────────┴────────────────────┴────────────────────────┴─────────┘
```

#### Version 2.3.2 - Bun

```
┌───┬──────────────────┬────────────────────────┬─────────┐
│   │ Task name        │ Throughput avg (ops/s) │ Samples │
├───┼──────────────────┼────────────────────────┼─────────┤
│ 0 │ parse            │ 3812 ± 0.24%           │ 35232   │
│ 1 │ parse and eval   │ 1638 ± 0.31%           │ 15645   │
│ 2 │ just eval        │ 3680 ± 0.26%           │ 33514   │
└───┴──────────────────┴────────────────────────┴─────────┘
```

#### Version 3.0.0 - Node JS

```
┌─────────┬──────────────────────────┬────────────────────────┬─────────┐
│ (index) │ Task name                │ Throughput avg (ops/s) │ Samples │
├─────────┼──────────────────────────┼────────────────────────┼─────────┤
│ 0       │ 'parse'                  │ '5820 ± 0.06%'         │ 57821   │
│ 1       │ 'parse and eval'         │ '2038 ± 0.06%'         │ 20328   │
│ 2       │ 'parse and eval basic'   │ '2938 ± 0.05%'         │ 29296   │
│ 3       │ 'just eval'              │ '3279 ± 0.04%'         │ 32717   │
│ 4       │ 'just eval basic'        │ '6286 ± 0.04%'         │ 62553   │
└─────────┴──────────────────────────┴────────────────────────┴─────────┘
```

#### Version 3.0.0 - Bun

```
┌───┬────────────────────────┬────────────────────────┬─────────┐
│   │ Task name              │ Throughput avg (ops/s) │ Samples │
├───┼────────────────────────┼────────────────────────┼─────────┤
│ 0 │ parse                  │ 6449 ± 0.22%           │ 56663   │
│ 1 │ parse and eval         │ 2528 ± 0.31%           │ 23465   │
│ 2 │ parse and eval basic   │ 3216 ± 0.27%           │ 29591   │
│ 3 │ just eval              │ 5128 ± 0.22%           │ 46370   │
│ 4 │ just eval basic        │ 8227 ± 0.15%           │ 74179   │
└───┴────────────────────────┴────────────────────────┴─────────┘
```

### City Lots

"Min" timings are probably more useful here as there's no explicit warmup phase for this benchmark.

#### Version 2.3.2 - Node JS

```
Benchmark                           | Min (s)    | Mean (s)
--------------------------------------------------------------
small-citylots:shallow              | 0.6085     | 0.6391
small-citylots:deep                 | 0.6139     | 0.6154
small-citylots:conditional          | 0.0147     | 0.0160
small-citylots:regex                | 0.0196     | 0.0208
medium-citylots:shallow             | 1.2365     | 1.3234
medium-citylots:deep                | 1.2515     | 1.2541
medium-citylots:conditional         | 0.0284     | 0.0293
medium-citylots:regex               | 0.0377     | 0.0382
citylots:shallow                    | 3.5220     | 3.5741
citylots:deep                       | 3.5604     | 3.5958
citylots:conditional                | 0.0580     | 0.0595
citylots:regex                      | 0.0764     | 0.0772
```

#### Version 2.3.2 - Bun

```
Benchmark                           | Min (s)    | Mean (s)
--------------------------------------------------------------
small-citylots:shallow              | 0.2509     | 0.3052
small-citylots:deep                 | 0.2829     | 0.2889
small-citylots:conditional          | 0.0094     | 0.0110
small-citylots:regex                | 0.0141     | 0.0166
medium-citylots:shallow             | 0.6028     | 0.6229
medium-citylots:deep                | 0.6791     | 0.6883
medium-citylots:conditional         | 0.0191     | 0.0223
medium-citylots:regex               | 0.0277     | 0.0336
citylots:shallow                    | 1.9324     | 1.9469
citylots:deep                       | 1.6093     | 1.8669
citylots:conditional                | 0.0356     | 0.0384
citylots:regex                      | 0.0588     | 0.0598
```

#### Version 3.0.0 - Node JS

```
Benchmark                           | Min (s)    | Mean (s)
--------------------------------------------------------------
small-citylots:shallow              | 0.1115     | 0.1275
small-citylots:deep                 | 0.1175     | 0.1177
small-citylots:conditional          | 0.0060     | 0.0072
small-citylots:regex                | 0.0113     | 0.0125
medium-citylots:shallow             | 0.2302     | 0.2488
medium-citylots:deep                | 0.2352     | 0.2353
medium-citylots:conditional         | 0.0127     | 0.0130
medium-citylots:regex               | 0.0209     | 0.0572
citylots:shallow                    | 0.6166     | 0.6709
citylots:deep                       | 0.6218     | 0.6228
citylots:conditional                | 0.0251     | 0.0255
citylots:regex                      | 0.0421     | 0.0433
```

#### Version 3.0.0 - Bun

```
Benchmark                           | Min (s)    | Mean (s)
--------------------------------------------------------------
small-citylots:shallow              | 0.0622     | 0.1095
small-citylots:deep                 | 0.0632     | 0.0637
small-citylots:conditional          | 0.0086     | 0.0095
small-citylots:regex                | 0.0119     | 0.0136
medium-citylots:shallow             | 0.1422     | 0.1451
medium-citylots:deep                | 0.1471     | 0.1474
medium-citylots:conditional         | 0.0167     | 0.0172
medium-citylots:regex               | 0.0234     | 0.0239
citylots:shallow                    | 0.3769     | 0.3874
citylots:deep                       | 0.3876     | 0.3884
citylots:conditional                | 0.0350     | 0.0363
citylots:regex                      | 0.0504     | 0.0509
```
