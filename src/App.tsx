import React from 'react';
import { useProductFeedback } from './hooks/useProductFeedback';
import data from './data.json';

interface AppProps {}

function App({}: AppProps) {
  const { feedback, upvoteProductRequest, addComment, replyToComment } =
    useProductFeedback(data);

  return <div></div>;
}

export default App;
