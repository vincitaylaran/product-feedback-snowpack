import React from 'react';
import { useProductFeedback } from './hooks/useProductFeedback';

interface AppProps {}

function App({}: AppProps) {
  const { feedback } = useProductFeedback();

  return (
    <div>
      <h1>Product feedback!!!</h1>
    </div>
  );
}

export default App;
