import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function DoctorAlertsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>High-Priority Alerts</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <AlertTriangle className="h-16 w-16 text-muted-foreground" />
        <h3 className="text-xl font-semibold">All Clear</h3>
        <p className="text-muted-foreground">High-priority alerts for your patients will appear here.</p>
      </CardContent>
    </Card>
  );
}
