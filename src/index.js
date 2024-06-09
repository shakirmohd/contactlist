import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import './index.css';
import store from './Components/redux/store/store';
import { ThemeProvider } from './Components/Contexts/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>
);