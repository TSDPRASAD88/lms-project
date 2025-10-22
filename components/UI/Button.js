// components/UI/Button.js
import React from 'react';

const Button = ({ children, variant = 'primary', className = '' }) => {
  const baseStyle = 'px-4 py-2 font-semibold rounded-lg transition duration-200';
  
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    // ... other variants for structural clarity
  };

  const finalStyle = `${baseStyle} ${variants[variant]} ${className}`;

  return (
    <button className={finalStyle}>
      {children}
    </button>
  );
};

export default Button;