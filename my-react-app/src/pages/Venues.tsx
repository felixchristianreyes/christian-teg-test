import VenueCard from "../components/ui/molecules/VenueCard";
import type { TEGVenue } from "../types";

interface VenuesPageProps {
  venues: TEGVenue[];
}

const VenuesPage = ({ venues }: VenuesPageProps) => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Venues</h1>
        <p className="text-gray-600">
          Explore our event venues and their capacities
        </p>
      </div>

      {venues.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No venues found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <VenueCard
              key={venue.id}
              name={venue.name}
              capacity={venue.capacity}
              location={venue.location}
              redirectTo={`/venues/${venue.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VenuesPage;
