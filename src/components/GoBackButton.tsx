import React from 'react';
import styles from '../scss/GoBackButton.module.scss';
import LeftArrow from '../../public/assets/shared/icon-arrow-left.svg';

function GoBackButton() {
  return (
    <div className={styles.goBackBtn}>
      <img src={LeftArrow} alt="Left arrow" />
      <span>Go Back</span>
    </div>
  );
}

export default GoBackButton;
