import React, { useState } from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle: React.CSSProperties = {
    padding: '12px 28px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: isHovered ? '#0056b3' : '#007bff', // Darker blue on hover
    color: '#ffffff',
    transition: 'background-color 0.2s ease, transform 0.2s ease',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)', // Subtle lift on hover
    boxShadow: '0 4px 12px rgba(0, 123, 255, 0.2)',
  };

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </button>
  );
};