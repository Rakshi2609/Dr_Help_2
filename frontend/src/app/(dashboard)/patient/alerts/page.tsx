import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

export default function PatientAlertsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alerts</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <Bell className="h-16 w-16 text-muted-foreground" />
        <h3 className="text-xl font-semibold">No New Alerts</h3>
        <p className="text-muted-foreground">All your notifications will appear here.</p>
      </CardContent>
    </Card>
  )
}
