// app/dashboard/page.js

// Import the refactored component from its new location
import StudentDashboardPage from '../../components/pages/student-dashboard-page';

// This file registers the /dashboard route and renders the student component.
export default function DashboardRoute() {
  return (
    <StudentDashboardPage />
  );
}