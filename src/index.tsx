import React from 'react';
import { createRoot } from 'react-dom/client'; 
import { ApolloProvider } from '@apollo/client'; 
import { Provider } from 'react-redux'; 
import { store } from './store/store'; 
import { client } from './graphql/apolloClient'; 
import App from './App';
import './styles.css';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
