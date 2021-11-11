import React from 'react';
import styles from '../scss/ShadowBackground.module.scss';

interface ShadowBackgroundProps {
  visible: boolean;
}

/**
 * Should only appear when viewing from mobile device.
 */
function ShadowBackground({ visible }: ShadowBackgroundProps): JSX.Element {
  // TODO: make this use framer-motion animations.
  // TODO: make this have 'display: none' style so it doesn't get in the way of when inspecting elements.
  return (
    <div
      className={`${styles.shadowBg} ${
        visible ? styles.fadeIn : styles.fadeOut
      }`}
    ></div>
  );
}

export default ShadowBackground;
