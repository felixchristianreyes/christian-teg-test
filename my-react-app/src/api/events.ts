// defining it here for the sake of simplicity

import type { EventListing } from "../types";

// ideally this should be in a .env file
const EVENTS_LISTING_API_URL = "/api/events/event-data.json";

const fetchEvents = async () => {
  const response = await fetch(EVENTS_LISTING_API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  //   Let's assume the API can return an empty response or no data
  //   In that case, we will return an empty array
  const data: EventListing = await response.json();

  if (!data.events) {
    return [];
  }

  return data.events;
};

const fetchVenues = async () => {
  const response = await fetch(EVENTS_LISTING_API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch venues");
  }

  const data: EventListing = await response.json();

  if (!data.venues) {
    return [];
  }

  return data.venues;
};

export { fetchEvents, fetchVenues };
