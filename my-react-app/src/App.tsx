import { useEffect, useState } from "react";
import { fetchEvents, fetchVenues } from "./api/events";
import type { TEGEvent, TEGVenue } from "./types";
import VenueCard from "./components/ui/molecules/VenueCard";
import { Input } from "./components/ui/input";

function App() {
  // Let's fetch the events from the API using use api
  // https://teg-coding-challenge.s3.ap-southeast-2.amazonaws.com/events/event-data.json

  const [events, setEvents] = useState<TEGEvent[]>([]);
  const [venues, setVenues] = useState<TEGVenue[]>([]);

  useEffect(() => {
    fetchEvents().then((events) => {
      setEvents(events);
    });

    fetchVenues().then((venues) => {
      setVenues(venues);
    });
  }, []);

  return (
    // Let's add an inline layout for now

    <div className="flex flex-col items-center justify-center p-4 w-full">
      {/* Let's start with a simple header */}
      <h1 className="text-2xl font-bold mb-4">Venues</h1>

      <Input
        placeholder="Search by venue name"
        className="w-full max-w-md mb-4"
      />

      {/* Let's list all the venues */}
      {/* i won't be adding pagination here with infinite scroll for now due to time constraints, but i will be adding a search bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {venues.map((venue) => (
          <VenueCard
            onClick={() => {
              console.log("clicked");
            }}
            key={venue.id}
            name={venue.name}
            capacity={venue.capacity}
            location={venue.location}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
