"use client"
import React from 'react';

// The MainLayout component structures the entire page using the other layout components.
const MainLayout = ({ children, sidebar, navbar, footer }) => (
  <div className="flex flex-col min-h-screen bg-gray-50">
    <header>
      {navbar}
    </header>

    <div className="flex flex-1 w-full overflow-hidden">
      <aside>
        {sidebar}
      </aside>
      
      {/* Main content area, centered and limited width for better readability */}
      <main className="flex-1 p-4 md:p-8 w-full overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
    
    <footer>
      {footer}
    </footer>
  </div>
);

export default MainLayout;