// Saloon Rush (Pro challenge) copy that has to match the Adonix grader exactly.

export const MAX_PLAN_SIZE_BYTES = 1024 * 1024;
export const DEFAULT_PASS_RATIO = 0.6;

export const SCORING = {
    pointsPerContract: 100,
    penaltyPerLateMinute: 5,
    minPointsPerContract: 20
} as const;

// From one Tier 1 floor plan (tier1-03). It scores 100.
export const EXAMPLE_PLAN = `{
  "instance": "tier1-03",
  "gang": "example",
  "routes": {
    "pickpocket-1": [
      { "t": 12, "cmd": "go", "to": "T3" },
      { "t": 24, "cmd": "pickup", "contract": "C-01" },
      { "t": 32, "cmd": "go", "to": "B17" },
      { "t": 32, "cmd": "dropoff", "contract": "C-01" }
    ]
  }
}`;

export const EXAMPLE_WORLD = `{
  "instance": "tier1-03",
  "shift_end": 180,
  "nodes": [
    { "id": "HQ", "type": "hideout" },
    { "id": "T3", "type": "game_table", "name": "Faro Table" },
    { "id": "B17", "type": "back_room" },
    { "id": "H4", "type": "hallway" },
    ...
  ],
  "connections": [
    { "a": "HQ", "b": "B18", "length": 3, "crowd": 2.1, "tags": [] },
    ...
  ],
  "mercenaries": [
    { "id": "pickpocket-1", "class": "pickpocket", "hideout": "HQ" }
  ],
  "contracts": [
    { "id": "C-01", "table": "T3", "back_room": "B17",
      "ready_at": 24, "deadline": 37 },
    ...
  ]
}`;
