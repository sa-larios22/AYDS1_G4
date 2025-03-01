// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Toaster />
      <App />
  </StrictMode>
);
