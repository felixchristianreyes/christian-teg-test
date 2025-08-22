import type { EventListing } from "../types";

const fetchData = async () => {
  const apiUrl = "/api/events/event-data.json";
  console.log(apiUrl);
  if (!apiUrl) {
    throw new Error("API URL not configured");
  }
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const data: EventListing = await response.json();

  if (!data.events) {
    return {
      events: [],
      venues: [],
    };
  }

  return {
    events: data.events,
    venues: data.venues,
  };
};

export { fetchData };
