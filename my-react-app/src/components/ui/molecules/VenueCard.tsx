import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { Armchair, Pin } from "lucide-react";

interface VenueCardProps {
  name: string;
  capacity: number;
  location: string;
}

const VenueCard = ({ name, capacity, location }: VenueCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription className="text-sm text-gray-600 flex items-center gap-2">
          <Armchair className="w-4 h-4" />
          {capacity} seats
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center gap-2">
          <Pin className="w-4 h-4" /> {location}
        </div>
      </CardContent>
    </Card>
  );
};

export default VenueCard;
