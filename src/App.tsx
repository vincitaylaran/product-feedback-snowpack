import React from 'react';
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
import type { ProductRequest } from './interfaces/productRequest.interface';

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
  const {
    feedback,
    categoryFilter,
    upvoteProductRequest,
    addComment,
    replyToComment,
    createProductRequest,
    deleteProductRequest,
    findProductRequest,
    sortProductRequestsByUpvotes,
    sortProductRequestsByCommentsCount,
    filterByCategory,
  } = useProductFeedback();

  const { data, loading, error } = useQuery(PRODUCT_REQUESTS);

  if (loading) return <h1>Loading...</h1>;
  if (error) console.error('error :(');
  if (data) console.log(data.AllRequests);

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
          <Roadmap productRequests={feedback.productRequests} />
        </Stack>
        <Stack>
          <OptionBanner suggestionLength={feedback.productRequests.length} />
          {data.AllRequests.map((request: ProductRequest) => {
            return (
              <RequestCard
                request={request}
                upvoteProductRequest={() => undefined}
              />
            );
          })}
        </Stack>
      </MainGrid>
    </PageContainer>
  );
}

export default App;
