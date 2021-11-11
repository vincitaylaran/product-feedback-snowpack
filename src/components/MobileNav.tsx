import React from 'react';
import styles from '../scss/MobileNav.module.scss';

interface MobileNavProps {
  children: React.ReactNode;
}

function MobileNav({ children }: MobileNavProps) {
  return <div className={styles.mobileNav}>{children}</div>;
}

export default MobileNav;
