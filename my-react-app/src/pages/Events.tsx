import { Link, useParams } from "react-router-dom";
import EventCard from "../components/ui/molecules/EventCard";
import type { TEGEvent, TEGVenue } from "../types";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
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

  const handleSelectEvent = (event: TEGEvent) => {
    setSelectedEvent(event);
    setEventDialogOpen(true);
  };

  if (!venueId) {
    return <div>Venue not found</div>;
  }

  // sort events by start date
  const filteredEvents = events.filter(
    (event) => event.venueId === parseInt(venueId)
  );

  const displayedEvents = filteredEvents.slice(0, displayCount);
  const hasMoreEvents = displayCount < filteredEvents.length;

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 4);
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

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No events found</p>
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
