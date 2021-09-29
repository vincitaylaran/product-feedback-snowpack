import React from 'react';
import { useProductFeedback } from './hooks/useProductFeedback';
import data from './data.json';

interface AppProps {}

function App({}: AppProps) {
  const { feedback, upvoteProductRequest, addComment } =
    useProductFeedback(data);

  return (
    <div>
      <h1>Product feedback!!!</h1>
    </div>
  );
}

export default App;
