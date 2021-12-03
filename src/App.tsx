import React, { useEffect, useState } from 'react';
import Rainbox from './components/Rainbox';
import FilterBox from './components/FilterBox';
import Roadmap from './components/Roadmap';

import type {
  ProductRequest,
  ProductRequestCategoryFilters,
} from './interfaces/productRequest.interface';
import type { User } from './interfaces/user.interface';

import HomeContainer from './components/HomeContainer';
import MainGrid from './components/MainGrid';
import OptionBanner from './components/OptionBanner';
import RequestCard from './components/RequestCard';
import HamburgerIcon from './components/HamburgerIcon';
import Drawer from './components/Drawer';
import WidgetsGrid from './components/WidgetsGrid';
import MobileNav from './components/MobileNav';
import EmptyFeedback from './components/EmptyFeedback';
import Loading from './components/Loading';

import { useProductFeedback } from './hooks/useProductFeedback';

function App() {
  const { data, currentUser } = useProductFeedback();
  const [categoryFilter, setCategoryFilter] =
    useState<ProductRequestCategoryFilters>('all');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const filterByCategory = (
    categoryFilter: ProductRequestCategoryFilters,
  ): void => {
    setCategoryFilter(categoryFilter);
  };

  const toggleWidgets = (): void => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <HomeContainer>
      {/* Hides at tablet breakpoint. */}
      <MobileNav>
        <Rainbox>
          <div>
            <h1>Frontend Mentor</h1>
            <h2>Feedback Board</h2>
          </div>
          <HamburgerIcon onClick={toggleWidgets} isOpen={isDrawerOpen} />

          <Drawer isOpen={isDrawerOpen}>
            <FilterBox
              filterByCategory={filterByCategory}
              currentFilter={categoryFilter}
            />
            <Roadmap productRequests={data} />
          </Drawer>
        </Rainbox>
        {/* <ShadowBackground visible={isDrawerOpen} /> */}
      </MobileNav>

      {/* Hides at mobile breakpoint. */}
      <WidgetsGrid>
        <Rainbox>
          <div>
            <h1>Frontend Mentor</h1>
            <h2>Feedback Board</h2>
          </div>
        </Rainbox>
        <FilterBox
          currentFilter={categoryFilter}
          filterByCategory={filterByCategory}
        />
        <Roadmap productRequests={data} />
      </WidgetsGrid>

      <MainGrid>
        <OptionBanner suggestionLength={data.length} />

        {data.length > 0 ? (
          <>
            {data.map((request) => (
              <RequestCard
                request={request}
                upvoteProductRequest={() => {}}
                key={request.id}
              />
            ))}
          </>
        ) : (
          <EmptyFeedback />
        )}
      </MainGrid>
    </HomeContainer>
  );
}

export default App;
