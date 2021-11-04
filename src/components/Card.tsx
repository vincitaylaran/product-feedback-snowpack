import React from 'react';

import styles from '../scss/Card.module.scss';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}
function Card({ children, className }: CardProps) {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
}

export default Card;
