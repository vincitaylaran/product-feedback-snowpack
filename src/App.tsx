import React, { useEffect, useState } from 'react';
import Rainbox from './components/Rainbox';
import FilterBox from './components/FilterBox';
import Roadmap from './components/Roadmap';

import PageContainer from './components/PageContainer';
import Stack from './components/Stack';
import MainGrid from './components/MainGrid';
import OptionBanner from './components/OptionBanner';
import RequestCard from './components/RequestCard';

import { useQuery, useMutation } from '@apollo/client';

import type {
  ProductRequest,
  ProductRequestCategoryFilters,
} from './interfaces/productRequest.interface';
import type { User } from './interfaces/user.interface';

import { PRODUCT_REQUESTS } from './graphql/queries';

interface AppProps {}

function App({}: AppProps) {
  const { data, loading, error } = useQuery(PRODUCT_REQUESTS);
  const [productRequests, setProductRequests] = useState<ProductRequest[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [categoryFilter, setCategoryFilter] =
    useState<ProductRequestCategoryFilters>('all');

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
    console.log('Requests', data.AllRequests);
    console.log('User', data.User);
  }

  const filterByCategory = (
    categoryFilter: ProductRequestCategoryFilters,
  ): void => {
    setCategoryFilter(categoryFilter);
  };

  const upvoteRequest = (requestId: number): void => {
    /**
     * find request using ID argument
     * if request exists
     *  if user had previously upvoted the same request
     *    remove user from request's "upvotes" array
     *    remove request from user's "upvotes" array
     *  else
     *    push user to request's "upvotes" array
     *    add request to user's "upvotes" array
     */
  };

  return (
    <PageContainer>
      <MainGrid>
        <Rainbox>
          <h1>Frontend Mentor</h1>
          <h2>Feedback Board</h2>
        </Rainbox>
      </MainGrid>
    </PageContainer>
  );
}

export default App;
