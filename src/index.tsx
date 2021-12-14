import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './scss/shared/global_styles.scss';
import './index.scss';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Comments from './routes/comments';
import NewFeedback from './routes/new-feedback';

import Comment from './components/Comment';

export const client = new ApolloClient({
  uri: 'https://fem-product-feedback.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/comments" element={<Comments />}>
            <Route path=":requestId" element={<Comment />} />
          </Route>
          <Route path="/new-feedback" element={<NewFeedback />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
