import type { EventListing } from "../types";
import { createCorsProxyUrl } from "../lib/utils";

const fetchData = async () => {
  const apiUrl = import.meta.env.VITE_EVENTS_LISTING_API_URL;
  console.log(apiUrl);
  if (!apiUrl) {
    throw new Error("API URL not configured");
  }
  
  // Use allorigins.win as a CORS proxy since we dont have a backend
  const proxyUrl = createCorsProxyUrl(apiUrl);
  
  const response = await fetch(proxyUrl);
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
