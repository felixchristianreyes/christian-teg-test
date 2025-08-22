import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TEGEvent, TEGVenue } from "@/types";

interface EventDialogProps {
  open: boolean;
  event: TEGEvent;
  venue: TEGVenue;
  handleClose: () => void;
}

const EventDialog = ({ open, event, venue, handleClose }: EventDialogProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getGenericDescription = () => {
    return "Join us for an amazing live performance! Experience the energy and excitement of live music in this incredible venue.";
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold mb-4">
            Watch {event.name} live at {venue?.name || "Unknown Venue"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <span className="font-semibold text-gray-700">Date:</span>
            <span className="ml-2 text-gray-600">
              {formatDate(event.startDate)}
            </span>
          </div>

          <div>
            <span className="font-semibold text-gray-700">Location:</span>
            <span className="ml-2 text-gray-600">
              {venue?.location || "Location not specified"}
            </span>
          </div>

          <div className="w-full overflow-y-auto max-h-[300px]">
            <span className="font-semibold text-gray-700">Description:</span>
            <div className="w-full overflow-y-auto max-h-[300px]">
              <p className="mt-2 text-gray-600 leading-relaxed">
                {event.description && event.description.trim() !== ""
                  ? event.description
                  : getGenericDescription()}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
