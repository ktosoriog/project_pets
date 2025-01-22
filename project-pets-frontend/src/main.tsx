// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AlertProvider } from './context/AlertContext';
import AlertDisplay from './components/AlertDisplay';
import './assets/styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AlertProvider>
      <BrowserRouter>
        <App />
        <AlertDisplay />
      </BrowserRouter>
    </AlertProvider>
  </React.StrictMode>
);
