import React from 'react';

import styles from '../scss/Card.module.scss';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  icon?: string;
}
function Card({ children, className, icon }: CardProps) {
  return (
    <div className={`${styles.card} ${className}`}>
      {icon && <img src={icon} alt="icon" className={styles.icon} />}
      {children}
    </div>
  );
}

export default Card;
