interface TEGEvent {
  id: number;
  name: string;
  description: string;
  startDate: string;
  venueId: number;
}

interface TEGVenue {
  id: number;
  name: string;
  capacity: number;
  location: string;
}

interface EventListing {
  events: TEGEvent[];
  venues: TEGVenue[];
}

export type { EventListing, TEGEvent, TEGVenue };
