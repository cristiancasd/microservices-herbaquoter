//import './index.css'
//import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from "react-router-dom";
import { QuoterApp } from './QuoterApp'
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <Provider store={store}>
      {/*<BrowserRouter>*/}
      <HashRouter>        
        <QuoterApp />
      </HashRouter>
      {/*</BrowserRouter>*/}
    </Provider> 
  //</React.StrictMode>
)

