import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from './axios';
import store from './store';

function RenderApp() {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
  );
}

function fetchAllContent() {
  store.update(s => { s.contentLoading = true; });

  const fetchContent = axios.get('/content').then((response) => response.data);
  const fetchCounter = axios.get('/count').then((response) => response.data);

  fetchContent
    .then((contents) => store.update(s => { s.contents = contents; }))
    .catch((err) => alert(err.message))
    .finally(() => store.update(s => { s.contentLoading = false; }));

  fetchCounter
    .then((counter) => store.update(s => { s.counter = counter; }));
}

fetchAllContent();
RenderApp();

if (module.hot) {
  module.hot.accept('./App', RenderApp);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
