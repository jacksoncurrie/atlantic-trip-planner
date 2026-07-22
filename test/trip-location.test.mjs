import assert from "node:assert/strict";
import test from "node:test";

import {
  getTripBaseForInstant,
  getTripDateKey
} from "../src/lib/trip-location.mjs";

test("uses the Atlantic local date for a UTC instant", () => {
  assert.equal(getTripDateKey(new Date("2026-07-23T02:59:59Z")), "2026-07-22");
  assert.equal(getTripDateKey(new Date("2026-07-23T03:00:00Z")), "2026-07-23");
});

test("moves the pin through the journey bases", () => {
  const journeyDates = [
    ["2026-07-23T15:00:00Z", "Halifax"],
    ["2026-07-24T15:00:00Z", "Halifax"],
    ["2026-07-25T15:00:00Z", "Moncton"],
    ["2026-07-26T15:00:00Z", "Moncton"],
    ["2026-07-27T15:00:00Z", "Charlottetown"],
    ["2026-07-28T15:00:00Z", "Charlottetown"],
    ["2026-07-29T15:00:00Z", "Charlottetown"],
    ["2026-07-30T15:00:00Z", "Margaree Valley"],
    ["2026-07-31T15:00:00Z", "Margaree Valley"],
    ["2026-08-01T15:00:00Z", "Margaree Valley"],
    ["2026-08-02T15:00:00Z", "Halifax"]
  ];

  journeyDates.forEach(([instant, expectedLocation]) => {
    assert.equal(
      getTripBaseForInstant(new Date(instant)).name,
      expectedLocation
    );
  });
});

test("uses the expected coordinates for each journey base", () => {
  const journeyBases = [
    [
      "2026-07-23T15:00:00Z",
      { name: "Halifax", lat: 44.6488, lon: -63.5752 }
    ],
    [
      "2026-07-25T15:00:00Z",
      { name: "Moncton", lat: 46.0878, lon: -64.7782 }
    ],
    [
      "2026-07-27T15:00:00Z",
      { name: "Charlottetown", lat: 46.238, lon: -63.131 }
    ],
    [
      "2026-07-30T15:00:00Z",
      { name: "Margaree Valley", lat: 46.338743, lon: -60.95321 }
    ]
  ];

  journeyBases.forEach(([instant, expectedLocation]) => {
    assert.deepEqual(
      getTripBaseForInstant(new Date(instant)),
      expectedLocation
    );
  });
});

test("changes locations at midnight in Atlantic time", () => {
  assert.equal(
    getTripBaseForInstant(new Date("2026-07-25T02:59:59Z")).name,
    "Halifax"
  );
  assert.equal(
    getTripBaseForInstant(new Date("2026-07-25T03:00:00Z")).name,
    "Moncton"
  );
});

test("keeps the pin in Halifax before and after the journey", () => {
  assert.equal(
    getTripBaseForInstant(new Date("2026-07-22T15:00:00Z")).name,
    "Halifax"
  );
  assert.equal(
    getTripBaseForInstant(new Date("2026-08-03T03:00:00Z")).name,
    "Halifax"
  );
});
