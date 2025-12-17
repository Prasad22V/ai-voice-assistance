import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DoctorCardsLoading } from "@/components/appointments/DoctorCardsLoading";
import { useAvailableDoctors } from "@/hooks/use-doctors";
import { MapPinIcon, PhoneIcon, StarIcon } from "lucide-react";
import Image from "next/image";

interface DoctorSelectionStepsProps {
  onContinue: () => void;
  onSelectDentist: (dentistId: string) => void;
  selectedDentistId: string | null;
}

function DoctorSelectionSteps({
  onContinue,
  onSelectDentist,
  selectedDentistId,
}: DoctorSelectionStepsProps) {
  const { data: dentists = [], isLoading } = useAvailableDoctors();
  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Choose your Dentist</h2>
        <DoctorCardsLoading />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Select a Dentist</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dentists.map((dentist) => (
          <Card
            key={dentist.id}
            className={`cursor-pointer hover:shadow-lg transition-all duration-300 ${
              selectedDentistId === dentist.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => onSelectDentist(dentist.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <Image
                  src={dentist.imageUrl}
                  alt={dentist.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover"
                />
                <div className="flex-1">
                  <CardTitle className="text-lg">{dentist.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {dentist.speciality || "Genral Dentistry"}
                  </CardDescription>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <StarIcon className="h-4 w-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-medium">5</span>
                    </div>
                    <span className="text-sm to-muted-foreground">
                      {dentist.appoitmentsCount} appointments
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPinIcon className="w-4 h-4" />
                <span>Dentwise</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <PhoneIcon className="w-4 h-4" />
                <span>{dentist.phone}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {dentist.bio ||
                  "Experianced dental professional providing quality care"}
              </p>
              <Badge variant="outline">Licensed Professional</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedDentistId && (
        <div className="flex justify-end">
          <Button onClick={onContinue}>Continue</Button>
        </div>
      )}
    </div>
  );
}
export default DoctorSelectionSteps;
