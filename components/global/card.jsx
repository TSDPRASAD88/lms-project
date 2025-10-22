import React from 'react';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white shadow-lg rounded-xl p-6 transition-all ${className}`}>
    {children}
  </div>
);

export default Card;