// Saloon Rush (Pro challenge) copy that has to match the Adonix grader exactly.

export const MAX_PLAN_SIZE_BYTES = 1024 * 1024;
export const DEFAULT_PASS_RATIO = 0.6;

export const SCORING = {
    pointsPerContract: 100,
    penaltyPerLateMinute: 5,
    minPointsPerContract: 20
} as const;

// A complete, small example with a five-minute walk on each leg.
export const EXAMPLE_PLAN = `{
  "instance": "tier1-sample",
  "routes": {
    "speedster-1": [
      { "t": 5, "cmd": "go", "to": "T1" },
      { "t": 5, "cmd": "pickup", "order": "O1" },
      { "t": 10, "cmd": "go", "to": "F1" },
      { "t": 10, "cmd": "dropoff", "order": "O1" }
    ]
  }
}`;

export const EXAMPLE_WORLD = `{
  "instance": "tier1-sample",
  "shift_end": 120,
  "nodes": [
    { "id": "S0", "type": "starting-location" },
    { "id": "T1", "type": "target" },
    { "id": "F1", "type": "fence" }
  ],
  "edges": [
    { "a": "S0", "b": "T1", "length": 10, "congestion": 1 },
    { "a": "T1", "b": "F1", "length": 10, "congestion": 1 }
  ],
  "drivers": [{ "id": "speedster-1", "class": "speedster", "start": "S0" }],
  "orders": [{ "id": "O1", "target": "T1", "fence": "F1", "ready_at": 5, "deadline": 20 }]
}`;
