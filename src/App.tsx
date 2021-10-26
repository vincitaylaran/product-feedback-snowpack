import React, { useEffect, useState } from 'react';
import { useProductFeedback } from './hooks/useProductFeedback';
import Rainbox from './components/content/Rainbox';
import FilterBox from './components/content/FilterBox';
import Roadmap from './components/content/Roadmap';

import PageContainer from './components/PageContainer';
import Stack from './components/Stack';
import MainGrid from './components/MainGrid';
import OptionBanner from './components/content/OptionBanner';
import RequestCard from './components/content/RequestCard';

import { useQuery, gql } from '@apollo/client';
import type {
  ProductRequest,
  ProductRequestCategoryFilters,
} from './interfaces/productRequest.interface';

const PRODUCT_REQUESTS = gql`
  {
    AllRequests {
      id
      title
      category
      status
      upvotes {
        id
      }
      description
      comments {
        id
        content
        user {
          id
          name
          username
          image
        }
      }
    }
  }
`;

interface AppProps {}

function App({}: AppProps) {
  const { data, loading, error } = useQuery(PRODUCT_REQUESTS);
  const [productRequests, setProductRequests] = useState<ProductRequest[]>([]);
  const [categoryFilter, setCategoryFilter] =
    useState<ProductRequestCategoryFilters>('all');

  useEffect(() => {
    if (data) {
      setProductRequests(data.AllRequests);
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
  if (data) console.log(data.AllRequests);

  const filterByCategory = (
    categoryFilter: ProductRequestCategoryFilters,
  ): void => {
    setCategoryFilter(categoryFilter);
  };

  return (
    <PageContainer>
      <MainGrid>
        <Stack>
          <Rainbox>
            <h1>Frontend Mentor</h1>
            <h2>Feedback Board</h2>
          </Rainbox>
          <FilterBox
            currentFilter={categoryFilter}
            filterByCategory={filterByCategory}
          />
          <Roadmap productRequests={productRequests} />
        </Stack>
        <Stack>
          <OptionBanner suggestionLength={productRequests.length} />
          {productRequests.map((request: ProductRequest) => (
            <RequestCard
              request={request}
              upvoteProductRequest={() => undefined}
              key={request.id}
            />
          ))}
        </Stack>
      </MainGrid>
    </PageContainer>
  );
}

export default App;
