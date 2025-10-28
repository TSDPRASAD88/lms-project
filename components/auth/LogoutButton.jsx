"use client";
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';

export default function LogoutButton({ colorClass }) {
    const handleLogout = async () => {
        try {
            const loadingToast = toast.loading('Logging out...', {
                duration: Infinity,
            });
            
            // Clear the session and redirect to the signin page
            await signOut({ callbackUrl: '/signin' }); 
            
            toast.dismiss(loadingToast);
            toast.success('You have been logged out.');

        } catch (error) {
            toast.error('Logout failed. Please try again.');
            console.error('Logout error:', error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className={`p-2 text-left rounded hover:bg-red-100 transition ${colorClass} font-semibold mt-2`}
        >
            Logout
        </button>
    );
}