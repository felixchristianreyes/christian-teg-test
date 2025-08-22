import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../card";

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  location: string;
}

const EventCard = ({ title, description, date, location }: EventCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-sm text-gray-600">
          {date}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-gray-700 mb-2">{description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <span>📍 {location}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
