# LMS Project: UI Component Plan

1. Project Structure Philosophy
* The project uses a component-based architecture.
* Organization: Components are grouped by scope and reusability:
* Layout/: High-level page wrappers.
* Common/: Global, application-wide components.
* UI/: Atomic, highly reusable elements (primitives).
* Domain/ (e.g., Course/): Feature-specific components.

2. Layout Components (Structural Wrappers)
* These components define the primary look and feel for different user journeys.
* RootLayout (app/layout.js):The main Next.js layout. Wraps the entire application, containing global imports and the      overall structure.
* DashboardLayout (components/Layout/DashboardLayout.js):The template for all authenticated routes (Student and Admin dashboards). Includes a persistent Sidebar and a main content area.
* AuthLayout (components/Layout/AuthLayout.js):
* A simple, centered wrapper used exclusively for public authentication pages (/login, /register).


3. Core Reusable Components (UI Primitives in components/UI/)
* These components are atomic and designed to be styled consistently using Tailwind CSS.
* Button (components/UI/Button.js): Supports multiple variants (e.g., primary - Indigo, secondary - Gray, danger - Red). Must include hover/focus states.
* Input (components/UI/Input.js):Standard form fields (text, email, password). Includes support for optional label and error states.
* Card (components/UI/Card.js):A general-purpose container with consistent visual styling (e.g., rounded corners, shadow) for grouping content.
* LoadingSpinner (components/UI/LoadingSpinner.js):Visual feedback element placeholder for asynchronous operations.


4. Common & Domain Components
* These components are more complex and combine UI primitives into application-specific elements.
* Navbar (components/Common/Navbar.js):Global navigation header. Includes Logo, primary navigation links (Home), and user actions (Login/Profile Avatar). Must be responsive (e.g., collapses to a mobile menu).
* Sidebar (components/Common/Sidebar.js):Navigation menu for the DashboardLayout. Contains user-role-specific links.
* CourseCard (components/Course/CourseCard.js):Displays a summary of a course within listings or the dashboard. Built using the Card UI primitive and includes a progress display placeholder.
* LoginForm (e.g., app/login/LoginForm.js):A functional component on the login page that arranges the Input and Button primitives to complete the form structure.


5. Responsiveness Plan
* All layout components (Navbar, DashboardLayout) and visual elements will utilize Tailwind CSS utility classes (e.g., sm:, md:, lg: prefixes) to ensure adaptation across screen sizes.
* Mobile Screens: Will default to single-column layouts, full-width components, and a collapsible main navigation (Navbar).
* Desktop Screens: Will use stable multi-column grid layouts and a permanent, visible sidebar.