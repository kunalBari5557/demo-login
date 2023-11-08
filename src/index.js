import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from './redux/Store';


const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme();

root.render(
  <React.StrictMode>
  <Provider store={store}>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  </Provider>
  </React.StrictMode>
);

reportWebVitals();
