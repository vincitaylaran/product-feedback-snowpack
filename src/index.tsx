import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './scss/shared/global_styles.scss';
import './index.scss';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const uri = 'https://fem-product-feedback.herokuapp.com/graphql';

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
