import React from 'react';
import Card from '../Card';

import styles from './Rainbox.module.scss';

interface RainboxProps {
  children: React.ReactNode;
}

function Rainbox({ children }: RainboxProps) {
  return <Card className={styles.rainbox}>{children}</Card>;
}

export default Rainbox;
