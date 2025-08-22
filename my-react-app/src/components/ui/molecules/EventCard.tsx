import type { TEGEvent, TEGVenue } from "../../../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";

interface EventCardProps {
  event: TEGEvent;
  venue: TEGVenue | null;
  onClick: () => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const EventCard = ({ event, venue, onClick }: EventCardProps) => {
  return (
    <Card
      className="hover:shadow-lg transition-shadow duration-200 cursor-pointer py-0"
      onClick={onClick}
    >
      <div className="flex">
        <div className="flex-1 p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg">{event.name}</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              {formatDate(event.startDate)}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-3 px-0">
            <p className="text-sm text-gray-700 mb-2">
              {event.description && event.description.length > 100
                ? event.description.slice(0, 100) + "..."
                : event.description}
            </p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-500">
                📍 {venue?.name ?? "Venue not found"}
              </span>
            </div>
          </CardContent>
        </div>
        <div className="w-48 h-48 flex-shrink-0">
          <img
            src={`https://picsum.photos/200/200?random=${event.id}`}
            alt={`Event ${event.name}`}
            className="w-full h-full object-cover rounded-r-lg"
          />
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
