import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EventsPage from "./pages/Events";
import VenuesPage from "./pages/Venues";
import type { TEGEvent, TEGVenue } from "./types";
import { fetchData } from "./api/events";

function App() {
  const [venues, setVenues] = useState<TEGVenue[]>([]);
  const [events, setEvents] = useState<TEGEvent[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      setVenues(data.venues);
      setEvents(data.events);
    };

    loadData();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<VenuesPage venues={venues} />} />
            <Route
              path="/venues/:venueId"
              element={<EventsPage events={events} venues={venues} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
