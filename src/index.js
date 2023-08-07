import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import MoviesProvider from './store/movies.provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MoviesProvider>
    <App />
  </MoviesProvider>
);
