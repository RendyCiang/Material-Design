import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

interface LogoProps {
  variant?: 'dark' | 'light';
}

const Logo: React.FC<LogoProps> = ({ variant = 'dark' }) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-gray-900';
  
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="bg-indigo-600 p-1.5 rounded-lg shadow-md">
        <ShoppingBag className="h-6 w-6 text-white" />
      </div>
      <span className={`text-xl font-bold ${textColor}`}>ShopMate</span>
    </Link>
  );
};

export default Logo;