import React from 'react';
import styles from '../scss/PageContainer.module.scss';

interface HomeContainerProps {
  children: React.ReactNode;
}

function HomeContainer({ children }: HomeContainerProps) {
  return <div className={styles.page_container}>{children}</div>;
}

export default HomeContainer;
