import React from 'react';
import { useProductFeedback } from './hooks/useProductFeedback';
import data from './data.json';
import Rainbox from './components/content/Rainbox';
import FilterBox from './components/content/FilterBox';
import Roadmap from './components/content/Roadmap';

import PageContainer from './components/PageContainer';
import Stack from './components/Stack';
import MainGrid from './components/MainGrid';
import OptionBanner from './components/content/OptionBanner';
import RequestCard from './components/content/RequestCard';

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
  } = useProductFeedback(data);

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
          {feedback.productRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              upvoteProductRequest={upvoteProductRequest}
            />
          ))}
        </Stack>
      </MainGrid>
    </PageContainer>
  );
}

export default App;
