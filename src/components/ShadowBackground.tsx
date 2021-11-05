import React from 'react';
import styles from '../scss/ShadowBackground.module.scss';

interface ShadowBackgroundProps {
  visible: boolean;
}

/**
 * Should only appear when viewing from mobile device.
 */
function ShadowBackground({ visible }: ShadowBackgroundProps): JSX.Element {
  return (
    <div
      className={`${styles.shadowBg} ${
        visible ? styles.fadeIn : styles.fadeOut
      }`}
    ></div>
  );
}

export default ShadowBackground;
