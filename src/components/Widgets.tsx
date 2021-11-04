import React from 'react';
import styles from '../scss/Widgets.module.scss';

interface WidgetsProps {
  children: React.ReactNode;
}

function Widgets({ children }: WidgetsProps): JSX.Element {
  return <div className={styles.widgets}>{children}</div>;
}

export default Widgets;
