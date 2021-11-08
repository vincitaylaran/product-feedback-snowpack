import React from 'react';
import styles from '../scss/Widgets.module.scss';
import ShadowBackground from './ShadowBackground';
import FilterBox, { FilterBoxProps } from './FilterBox';
import Roadmap, { RoadmapProps } from './Roadmap';
import { motion } from 'framer-motion';

interface WidgetsProps extends FilterBoxProps, RoadmapProps {
  visible: boolean;
}

function Widgets({
  currentFilter,
  filterByCategory,
  productRequests,
  visible,
}: WidgetsProps): JSX.Element {
  return (
    <motion.div
      className={styles.widgets}
      animate={visible ? 'open' : 'closed'}
      variants={variants}
      transition={{
        default: { duration: 0.25 },
      }}
    />
  );
}

const variants = {
  open: { x: 0 },
  closed: { x: '100%' },
};

export default Widgets;
