import React from 'react';
import styles from '../scss/Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  color?: 'purple' | 'blue' | 'red';
  onClick?: () => any;
}

function Button({ children, onClick, color }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${color && styles[color]}`}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
}

export default Button;
