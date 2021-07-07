// Packages
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

// Components
import App from './App';

// Logic

// Context
import UserProvider from "./context/UserContext";

// Styles
import './styles/index.css';

// Assets



ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
);

reportWebVitals();
