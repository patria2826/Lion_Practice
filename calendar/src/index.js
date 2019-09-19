import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// import Calendar from './components/Calendar';

window.calendar = ReactDOM.render(
    <App />,
    document.querySelector('#root')
)