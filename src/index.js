import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// const devMode = process.env.NODE_ENV === 'development';
// if (devMode && module && module.hot) {
//   module.hot.accept();
// }

reportWebVitals();
