'use client'
import { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Use replace to redirect without adding to history
      window.location.replace('/');
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl font-bold text-gray-600">Redirecting to Home...</p>
    </div>
  );
};

export default HomePage;