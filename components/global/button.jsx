import React from 'react';

const Button = ({ type = 'button', disabled = false, onClick, children, className = '' }) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`
      px-4 py-2 rounded bg-indigo-600 text-white font-semibold 
      hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 
      disabled:opacity-50 disabled:cursor-not-allowed transition
      ${className}
    `}
  >
    {children}
  </button>
);

export default Button;