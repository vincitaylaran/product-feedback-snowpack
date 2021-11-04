import React, { useState } from 'react';
import styles from '../scss/HamburgerIcon.module.scss';

function HamburgerIcon(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleButton = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${styles.menuBtn} ${isOpen ? styles.open : ''}`}
      onClick={toggleButton}
    >
      <div className={styles.menuBtn__burger}></div>
    </div>
  );
}

export default HamburgerIcon;
