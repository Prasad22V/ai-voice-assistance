import {
  useGetAppoitments,
  useUpdateAppointmentStatus,
} from "@/hooks/use-appoitments";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Calendar } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";

function RecentAppointments() {
  const { data: appoitments = [], isLoading: appoitmentsLoading } =
    useGetAppoitments();
  const updateAppointmentMutation = useUpdateAppointmentStatus();

  const handleToggleAppointmentStatus = (appointmentId: string) => {
    const appontment = appoitments.find((app) => app.id === appointmentId);
    const newStatus =
      appontment?.status === "CONFIRMED" ? "COMPLETED" : "CONFIRMED";
    updateAppointmentMutation.mutate({ id: appointmentId, status: newStatus });
  };

 
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Confirmed</Badge>;
      case "COMPLETED":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
  return (
    <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-primary" />
        Recent Appointments
      </CardTitle>
      <CardDescription>Monitor and manage all patient appointments</CardDescription>
    </CardHeader>

    <CardContent>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {appoitments.map((appoitment) => (
              <TableRow key={appoitment.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{appoitment.patientName}</div>
                    <div className="text-sm text-muted-foreground">
                      {appoitment.patientEmail}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{appoitment.doctorName}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">
                      {new Date(appoitment.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-muted-foreground">{appoitment.time}</div>
                  </div>
                </TableCell>
                <TableCell>{appoitment.reason}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleAppointmentStatus(appoitment.id)}
                    className="h-6 px-2"
                  >
                    {getStatusBadge(appoitment.status)}
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <div className="text-xs text-muted-foreground">Click status to toggle</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
  );
}

export default RecentAppointments;
