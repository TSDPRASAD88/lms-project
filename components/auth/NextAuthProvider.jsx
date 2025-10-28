// components/auth/NextAuthProvider.jsx

"use client"; // CRITICAL: Marks this file as a Client Component

import { SessionProvider } from 'next-auth/react';

// The children prop allows this component to wrap your entire app content
export default function NextAuthProvider({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}