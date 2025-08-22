import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EventsPage from "./pages/Events";
import VenuesPage from "./pages/Venues";
import type { TEGEvent, TEGVenue } from "./types";
import { fetchData } from "./api/events";

function App() {
  const [venues, setVenues] = useState<TEGVenue[]>([]);
  const [events, setEvents] = useState<TEGEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching data...");
        const data = await fetchData();
        setVenues(data.venues);
        setEvents(data.events);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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
