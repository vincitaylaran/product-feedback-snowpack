import React from 'react';
import styles from '../scss/Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => any;
}

function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className={styles.button}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
}

export default Button;
