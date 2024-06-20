import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../routes/index'
import './styles/index.css'
import { io } from "socket.io-client";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
