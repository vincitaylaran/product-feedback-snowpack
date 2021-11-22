import React from 'react';

interface ArrowIconProps {
  color: string;
  direction: 'up' | 'down';
}

function ArrowIcon({ color, direction }: ArrowIconProps) {
  return (
    <>
      {direction === 'up' ? (
        <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 6l4-4 4 4"
            stroke={color}
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      ) : (
        <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 1l4 4 4-4"
            stroke={color}
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      )}
    </>
  );
}

export default ArrowIcon;
