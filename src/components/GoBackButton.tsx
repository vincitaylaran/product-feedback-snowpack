import React from 'react';
import styles from '../scss/GoBackButton.module.scss';
import LeftArrow from '../../public/assets/shared/icon-arrow-left.svg';
import { Link } from 'react-router-dom';

function GoBackButton() {
  return (
    <Link to="/" className={styles.goBackBtn}>
      <img src={LeftArrow} alt="Left arrow" />
      <span>Go Back</span>
    </Link>
  );
}

export default GoBackButton;
