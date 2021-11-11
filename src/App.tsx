import React, { useEffect, useState } from 'react';
import Rainbox from './components/Rainbox';
import FilterBox from './components/FilterBox';
import Roadmap from './components/Roadmap';

import { useQuery, useMutation } from '@apollo/client';

import type {
  ProductRequest,
  ProductRequestCategoryFilters,
} from './interfaces/productRequest.interface';
import type { User } from './interfaces/user.interface';

import { PRODUCT_REQUESTS } from './graphql/queries';
import Card from './components/Card';
import ShadowBackground from './components/ShadowBackground';

import { isViewingFromMobileDevice } from './helper-functions';

import PageContainer from './components/PageContainer';
import Stack from './components/Stack';
import MainGrid from './components/MainGrid';
import OptionBanner from './components/OptionBanner';
import RequestCard from './components/RequestCard';
import HamburgerIcon from './components/HamburgerIcon';
import Drawer from './components/Drawer';
import WidgetsGrid from './components/WidgetsGrid';
import MobileNav from './components/MobileNav';

interface AppProps {}

function App({}: AppProps) {
  const { data, loading, error } = useQuery(PRODUCT_REQUESTS);
  const [productRequests, setProductRequests] = useState<ProductRequest[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [categoryFilter, setCategoryFilter] =
    useState<ProductRequestCategoryFilters>('all');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setProductRequests(data.AllRequests);
      setCurrentUser(data.User);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      if (categoryFilter === 'all') {
        setProductRequests(data.AllRequests);
      } else {
        setProductRequests(
          data.AllRequests.filter(
            (request: ProductRequest) =>
              request.category.toLowerCase() === categoryFilter,
          ),
        );
      }
    }
  }, [categoryFilter]);

  if (loading) return <h1>Loading...</h1>;
  if (error) console.error('error :(');

  const filterByCategory = (
    categoryFilter: ProductRequestCategoryFilters,
  ): void => {
    setCategoryFilter(categoryFilter);
  };

  const toggleWidgets = (): void => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {/* 
      // Should not render conditionally via JS.
      // Should only appear via CSS/SASS.
      <WidgetsGrid>
        ...children
      </WidgetsGrid>

      // Should not render conditionally via JS.
      // Should only appear via CSS/SASS.
      <Navigation>
        ...children
      </Navigation>
      */}
      <MobileNav
        isDrawerOpen={isDrawerOpen}
        filterByCategory={filterByCategory}
        currentFilter={categoryFilter}
        productRequests={productRequests}
        onHamburgerClick={toggleWidgets}
      />

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
        <Roadmap productRequests={productRequests} />
      </WidgetsGrid>

      {/* <ShadowBackground visible={isDrawerOpen} /> */}

      <MainGrid>
        <OptionBanner suggestionLength={productRequests.length} />
        {/* {
              productRequests.length > 0
              ? (productRequests.map(request => <RequestCard />)) 
              : <NoRequests />
            } */}
        <div style={{ height: '100vh' }}></div>
      </MainGrid>
    </>
  );
}

export default App;
