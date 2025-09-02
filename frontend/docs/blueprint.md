# **App Name**: PainSense

## Core Features:

- Patient Authentication: Secure sign-up and login for patients with custom authentication, redirecting to the patient dashboard.
- Doctor Authentication: Secure login for doctors using fixed credentials, redirecting to the doctor dashboard.
- Patient Dashboard: Display patient-specific data including a patient card, problem statement banner, pain trend chart, vitals, and alerts.
- Doctor Dashboard: Display a doctor view with AI insights, a patient list with current pain scores, a pain trend chart for a selected patient, and a list of alerts for patients experiencing high pain levels.
- AI Insights Tool: Provide doctors with AI-driven insights and recommendations based on patient data using dummy text for MVP purposes. LLM may use reasoning when suggesting potential recommendations.
- Informational Pages: Provide static 'About Us', 'Achievements', and 'Blog' pages with content fetched from JSON files.
- Theme Management: Enable users to switch between light, dark, and system-preferred themes with smooth transitions.

## Style Guidelines:

- Light Mode: Background uses a gradient from light cyan (#f0f9ff) to very light cyan (#e0f2fe).
- Light Mode: Primary color is vibrant blue (#2563eb) for main actions.
- Light Mode: Secondary color is a darker blue (#1e40af) for accents.
- Light Mode: Text color is dark gray (#1e293b) for readability.
- Dark Mode: Background uses a gradient from dark blue (#0f172a) to teal (#0d9488).
- Dark Mode: Primary color is bright cyan (#38bdf8) for high contrast.
- Dark Mode: Secondary color is teal (#14b8a6) for highlights.
- Dark Mode: Text color is very light gray (#f8fafc) for legibility.
- Headings: 'Inter' (sans-serif) with bold weight.
- Body: base font size with relaxed line height using default sans-serif.
- Use 'lucide-react' icons throughout the app for a consistent and modern feel; highlight active links in the sidebar.
- Responsive layout with sidebar navigation and a top navbar, utilizing grid and flex layouts for main content.
- Subtle scale-up on button/card hover effects and smooth dark/light theme transitions with a duration of 300ms.