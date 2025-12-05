import React from "react";
import { Card, CardContent } from "../ui/card";
import { Calendar, Clock, UserCheck, Users } from "lucide-react";
interface AdminStatsProps {
  totalDoctors: number;
  activeDoctors: number;
  totalAppoitments: number;
  completedAppoitments: number;
}

const AdminStats = ({
  totalDoctors,
  activeDoctors,
  totalAppoitments,
  completedAppoitments,
}: AdminStatsProps) => {
  return (
    <div className="grid md:grid-cols-4 gap-6 mb-12">
    <Card className="border-2 hover:border-primary/30 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
            <Users className="size-6" />
          </div>
          <div>
            <div className="text-2xl font-bold">{totalDoctors}</div>
            <div className="text-sm text-muted-foreground">Total Doctors</div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="border-2 hover:border-primary/30 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
            <UserCheck className="size-6" />
          </div>
          <div>
            <div className="text-2xl font-bold">{activeDoctors}</div>
            <div className="text-sm text-muted-foreground">Active Doctors</div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="border-2 hover:border-primary/30 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
            <Calendar className="size-6" />
          </div>
          <div>
                <div className="text-2xl font-bold">{totalAppoitments}</div>
            <div className="text-sm text-muted-foreground">Total Appointments</div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="border-2 hover:border-primary/30 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
            <Clock className="size-6" />
          </div>
          <div>
            <div className="text-2xl font-bold">{completedAppoitments}</div>
            <div className="text-sm text-muted-foreground">Completed Appoitments</div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
  )
};

export default AdminStats;
