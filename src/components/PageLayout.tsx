import React from 'react';
import styles from '../scss/PageLayout.module.scss';

interface PageLayoutProps {
  children: React.ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
  return <div className={styles.layout}>{children}</div>;
}

interface PageNavProps {
  children: React.ReactNode;
}

export function PageNav({ children }: PageNavProps) {
  return <div className={styles.pageNav}>{children}</div>;
}

export default PageLayout;
