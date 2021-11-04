import React from 'react';
import styles from '../scss/ShadowBackground.module.scss';

/**
 * Should only appear when viewing from mobile device.
 */
function ShadowBackground(): JSX.Element {
  return <div className={styles.shadowBg}></div>;
}

export default ShadowBackground;
