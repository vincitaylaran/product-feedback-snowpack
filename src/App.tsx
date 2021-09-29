import React, { useState } from 'react';
import { useProductFeedback } from './hooks/useProductFeedback';
import data from './data.json';
import Rainbox from './components/Rainbox';
import PageContainer from './components/PageContainer';
import FilterBox from './components/FilterBox';
import Roadmap from './components/Roadmap';
import Stack from './components/Stack';

interface AppProps {}

function App({}: AppProps) {
  const { feedback, upvoteProductRequest, addComment, replyToComment } =
    useProductFeedback(data);

  return (
    <PageContainer>
      <Stack>
        <Rainbox>
          <h1>Frontend Mentor</h1>
          <h2>Feedback Board</h2>
        </Rainbox>
        <FilterBox />
        <Roadmap />
      </Stack>
    </PageContainer>
  );
}

export default App;
