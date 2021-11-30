import React from 'react';
import styles from '../scss/HomeContainer.module.scss';

interface HomeContainerProps {
  children: React.ReactNode;
}

function HomeContainer({ children }: HomeContainerProps) {
  return <div className={styles.home_container}>{children}</div>;
}

export default HomeContainer;
