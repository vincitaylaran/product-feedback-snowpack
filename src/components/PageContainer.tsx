import React from 'react';
import styles from './PageContainer.module.scss';

interface PageContainerProps {
  children: React.ReactNode;
}

function PageContainer({ children }: PageContainerProps) {
  return <div className={styles.page_container}>{children}</div>;
}

export default PageContainer;
