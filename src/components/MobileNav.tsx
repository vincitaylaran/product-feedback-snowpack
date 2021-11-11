import React from 'react';
import styles from '../scss/MobileNav.module.scss';
import Drawer, { DrawerProps } from './Drawer';
import FilterBox, { FilterBoxProps } from './FilterBox';
import HamburgerIcon, { HamburgerIconProps } from './HamburgerIcon';
import Rainbox from './Rainbox';
import Roadmap, { RoadmapProps } from './Roadmap';

interface MobileNavProps extends FilterBoxProps, RoadmapProps {
  isDrawerOpen: boolean;
  onHamburgerClick: () => void;
}

function MobileNav({
  isDrawerOpen,
  filterByCategory,
  currentFilter,
  productRequests,
  onHamburgerClick,
}: MobileNavProps) {
  return (
    <div className={styles.mobileNav}>
      <Rainbox>
        <div>
          <h1>Frontend Mentor</h1>
          <h2>Feedback Board</h2>
        </div>
        <HamburgerIcon onClick={onHamburgerClick} isOpen={isDrawerOpen} />

        <Drawer isOpen={isDrawerOpen}>
          <FilterBox
            filterByCategory={filterByCategory}
            currentFilter={currentFilter}
          />
          <Roadmap productRequests={productRequests} />
        </Drawer>
      </Rainbox>
    </div>
  );
}

export default MobileNav;
