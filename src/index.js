import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reducer,{initialState} from './reducer'
import {StateProvider} from './StateProvider'
ReactDOM.render(
  <React.StrictMode>
  {/* this StateProvider is like a data later and you wraps this app inside it
  now you can access the user anywhere you want in the app
  other option is passing user everytime inside the props which is 
  very difficult and confusing... */}
  {/* now if i want the user at very deep layer then we need to 
  pass to the complete tree and props drilling will make the app
  slow and hard to code. */}
  <StateProvider initialState={initialState} reducer={reducer}>  
  <App />
  </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
