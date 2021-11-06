import React from 'react';
import styles from '../scss/Widgets.module.scss';
import ShadowBackground from './ShadowBackground';
import FilterBox, { FilterBoxProps } from './FilterBox';
import Roadmap, { RoadmapProps } from './Roadmap';
import { animated, useSpring } from 'react-spring';

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
    <div className={`${styles.widgets}`}>
      <ShadowBackground visible={visible} />
      <WidgetsContent visible={visible}>
        <FilterBox
          currentFilter={currentFilter}
          filterByCategory={filterByCategory}
        />
        <Roadmap productRequests={productRequests} />
      </WidgetsContent>
    </div>
  );
}

interface WidgetsContentProps {
  children: React.ReactNode;
  visible?: boolean;
}

function WidgetsContent({
  children,
  visible,
}: WidgetsContentProps): JSX.Element {
  const props = useSpring({
    width: window.innerWidth * 0.75,
    height: '100%',
    padding: '24px',
    gridGap: '24px',
    display: visible ? 'grid' : 'none',
    gridAutoRows: 'min-content',
    position: 'absolute',
    left: visible ? window.innerWidth * -0.75 : 0,
    background: 'black',
  });

  console.log('inner width', window.innerWidth);

  return <animated.div style={props}>{children}</animated.div>;
}

export default Widgets;
