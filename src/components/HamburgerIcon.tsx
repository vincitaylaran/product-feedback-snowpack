import React, { useState } from 'react';
import styles from '../scss/HamburgerIcon.module.scss';

export interface HamburgerIconProps {
  onClick: () => void;
  isOpen: boolean;
}

function HamburgerIcon({ onClick, isOpen }: HamburgerIconProps): JSX.Element {
  // const [isOpen, setIsOpen] = useState<boolean>(false);

  // const toggleButton = (): void => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div
      className={`${styles.menuBtn} ${isOpen ? styles.open : ''}`}
      onClick={onClick}
    >
      <div className={styles.menuBtn__burger}></div>
    </div>
  );
}

export default HamburgerIcon;
