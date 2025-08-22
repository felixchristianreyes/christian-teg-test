import { Link, useParams } from "react-router-dom";
import EventCard from "../components/ui/molecules/EventCard";
import type { TEGEvent, TEGVenue } from "../types";
import { ArrowLeft, Search } from "lucide-react";
import { useState, useMemo } from "react";
import EventDialog from "@/components/ui/molecules/EventDialog";

interface EventsPageProps {
  events: TEGEvent[];
  venues: TEGVenue[];
}

const getVenueName = (venueId: number, venues: TEGVenue[]) => {
  const venue = venues.find((v) => v.id === venueId);
  return venue?.name;
};

const getVenue = (venueId: number, venues: TEGVenue[]) => {
  return venues.find((v) => v.id === venueId);
};

const EventsPage = ({ events, venues }: EventsPageProps) => {
  const { venueId } = useParams();

  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<TEGEvent | null>(null);
  const [displayCount, setDisplayCount] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"earliest" | "oldest">("earliest");

  const handleSelectEvent = (event: TEGEvent) => {
    setSelectedEvent(event);
    setEventDialogOpen(true);
  };

  // Filter events by venue and search query
  const filteredEvents = useMemo(() => {
    if (!venueId) return [];
    
    let filtered = events.filter(
      (event) => event.venueId === parseInt(venueId)
    );

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((event) =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return sortOrder === "earliest" ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  }, [events, venueId, searchQuery, sortOrder]);

  if (!venueId) {
    return <div>Venue not found</div>;
  }

  const displayedEvents = filteredEvents.slice(0, displayCount);
  const hasMoreEvents = displayCount < filteredEvents.length;

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 4);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setDisplayCount(4); // Reset display count when searching
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as "earliest" | "oldest");
    setDisplayCount(4); // Reset display count when sorting
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <ArrowLeft />
        <Link to="/">Back to venues</Link>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Upcoming events for {getVenueName(parseInt(venueId), venues)}
        </h1>
        <p className="text-gray-600">
          Discover upcoming events and performances
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex-shrink-0">
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="earliest">Earliest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchQuery.trim() ? "No events found matching your search" : "No events found"}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {displayedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                venue={getVenue(event.venueId, venues) ?? null}
                onClick={() => handleSelectEvent(event)}
              />
            ))}
          </div>
          {hasMoreEvents && (
            <div className="text-center mt-8">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}

      {selectedEvent && (
        <EventDialog
          open={eventDialogOpen}
          event={selectedEvent}
          venue={getVenue(selectedEvent.venueId, venues)!}
          handleClose={() => setEventDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default EventsPage;
