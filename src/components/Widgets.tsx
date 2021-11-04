import React from 'react';
import styles from '../scss/Widgets.module.scss';
import ShadowBackground from './ShadowBackground';
import FilterBox, { FilterBoxProps } from './FilterBox';
import Roadmap, { RoadmapProps } from './Roadmap';

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
    <div className={`${styles.widgets} ${visible ? '' : styles.hidden}`}>
      <ShadowBackground />
      <WidgetsContent>
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
}

function WidgetsContent({ children }: WidgetsContentProps): JSX.Element {
  return <div className={styles.content}>{children}</div>;
}

export default Widgets;
