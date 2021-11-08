import React, { useEffect, useState } from 'react';
import Rainbox from './components/Rainbox';
import FilterBox from './components/FilterBox';
import Roadmap from './components/Roadmap';

import PageContainer from './components/PageContainer';
import Stack from './components/Stack';
import MainGrid from './components/MainGrid';
import OptionBanner from './components/OptionBanner';
import RequestCard from './components/RequestCard';
import HamburgerIcon from './components/HamburgerIcon';
import Widgets from './components/Widgets';

import { useQuery, useMutation } from '@apollo/client';

import type {
  ProductRequest,
  ProductRequestCategoryFilters,
} from './interfaces/productRequest.interface';
import type { User } from './interfaces/user.interface';

import { PRODUCT_REQUESTS } from './graphql/queries';
import Card from './components/Card';
import ShadowBackground from './components/ShadowBackground';

interface AppProps {}

function App({}: AppProps) {
  const { data, loading, error } = useQuery(PRODUCT_REQUESTS);
  const [productRequests, setProductRequests] = useState<ProductRequest[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [categoryFilter, setCategoryFilter] =
    useState<ProductRequestCategoryFilters>('all');
  const [areWidgetsVisible, setAreWidgetsVisible] = useState<boolean>(false);

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
  if (data) {
    // console.log('Requests', data.AllRequests);
    // console.log('User', data.User);
  }

  const filterByCategory = (
    categoryFilter: ProductRequestCategoryFilters,
  ): void => {
    setCategoryFilter(categoryFilter);
  };

  const toggleWidgets = (): void => {
    setAreWidgetsVisible(!areWidgetsVisible);
  };

  return (
    <>
      <Rainbox>
        <div>
          <h1>Frontend Mentor</h1>
          <h2>Feedback Board</h2>
        </div>
        <HamburgerIcon onClick={toggleWidgets} isOpen={areWidgetsVisible} />
      </Rainbox>
      <Widgets
        currentFilter={categoryFilter}
        filterByCategory={filterByCategory}
        productRequests={productRequests}
        visible={areWidgetsVisible}
      />
      <PageContainer>
        <MainGrid></MainGrid>
      </PageContainer>
    </>
  );
}

export default App;
