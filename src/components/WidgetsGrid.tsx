import React from 'react';
import styles from '../scss/WidgetsGrid.module.scss';

interface WidgetsGridInterface {
  children: React.ReactNode;
}

function WidgetsGrid({ children }: WidgetsGridInterface) {
  return <div className={styles.widgetsGrid}>{children}</div>;
}

export default WidgetsGrid;
