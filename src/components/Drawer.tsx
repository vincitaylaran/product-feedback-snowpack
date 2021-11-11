import React from 'react';
import styles from '../scss/Drawer.module.scss';
import ShadowBackground from './ShadowBackground';
import FilterBox, { FilterBoxProps } from './FilterBox';
import Roadmap, { RoadmapProps } from './Roadmap';
import { motion } from 'framer-motion';

const isViewingFromMobileDevice = window.innerWidth <= 480;

// interface DrawerProps extends FilterBoxProps, RoadmapProps {
//   visible: boolean;
// }

export interface DrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
}

function Drawer({ children, isOpen }: DrawerProps): JSX.Element {
  return (
    <motion.div
      className={styles.drawer}
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
      transition={{
        default: { duration: 0.25 },
      }}
    >
      {children}
    </motion.div>
  );
}

const variants = {
  open: { x: 0 },
  closed: { x: '100%' },
};

export default Drawer;
