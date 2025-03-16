import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "../icons";

interface ResourceNotFoundProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function ResourceNotFound({
  title = "Resource Not Found",
  description = "The resource you are looking for could not be found or might have been removed.",
  buttonText = "Go Back",
  onButtonClick = () => window.history.back(),
}: ResourceNotFoundProps) {
  return (
    <div className="mt-24 flex items-center justify-center px-4">
      <Card className="max-w-lg mx-auto shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-blue-700">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center text-center">
            <div className="rounded-full bg-blue-50 p-6 mb-4">
              <Icon glyph="warning" className="w-12 h-12" />
            </div>
            <p className="text-gray-600 mb-2">{description}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <Button
            onClick={onButtonClick}
            className="bg-blue-600 hover:bg-blue-700 px-6"
          >
            {buttonText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
