import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <Settings className="h-16 w-16 text-muted-foreground" />
        <h3 className="text-xl font-semibold">Settings Page</h3>
        <p className="text-muted-foreground">User profile and application settings will be available here.</p>
      </CardContent>
    </Card>
  );
}
