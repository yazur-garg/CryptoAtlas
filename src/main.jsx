import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css'
import App from './App.jsx'

import CoinContextProvider from "./context/CoinContext";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <CoinContextProvider>
        <App />
      </CoinContextProvider>
    </Router>
  </React.StrictMode>,
)
