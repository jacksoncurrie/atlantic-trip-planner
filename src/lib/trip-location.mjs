export const TRIP_TIME_ZONE = "America/Halifax";

export const HALIFAX_LOCATION = Object.freeze({
  name: "Halifax",
  lat: 44.6488,
  lon: -63.5752
});

export const JOURNEY_BASES = Object.freeze([
  Object.freeze({
    startDate: "2026-07-23",
    endDate: "2026-07-24",
    location: HALIFAX_LOCATION
  }),
  Object.freeze({
    startDate: "2026-07-25",
    endDate: "2026-07-26",
    location: Object.freeze({
      name: "Moncton",
      lat: 46.0878,
      lon: -64.7782
    })
  }),
  Object.freeze({
    startDate: "2026-07-27",
    endDate: "2026-07-29",
    location: Object.freeze({
      name: "Charlottetown",
      lat: 46.238,
      lon: -63.131
    })
  }),
  Object.freeze({
    startDate: "2026-07-30",
    endDate: "2026-08-01",
    location: Object.freeze({
      name: "Margaree Valley",
      lat: 46.338743,
      lon: -60.95321
    })
  }),
  Object.freeze({
    startDate: "2026-08-02",
    endDate: "2026-08-02",
    location: HALIFAX_LOCATION
  })
]);

const tripDateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TRIP_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
});

export const getTripDateKey = (instant = new Date()) => {
  // Date supplies the UTC instant; the formatter decides its Atlantic calendar day.
  const dateParts = Object.fromEntries(
    tripDateFormatter
      .formatToParts(instant)
      .filter(({ type }) => type !== "literal")
      .map(({ type, value }) => [type, value])
  );

  return `${dateParts.year}-${dateParts.month}-${dateParts.day}`;
};

export const getTripBaseForInstant = (instant = new Date()) => {
  const tripDate = getTripDateKey(instant);
  const journeyBase = JOURNEY_BASES.find(
    ({ startDate, endDate }) => tripDate >= startDate && tripDate <= endDate
  );

  return journeyBase?.location ?? HALIFAX_LOCATION;
};
