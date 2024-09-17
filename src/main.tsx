import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AuthProvider } from '~contexts/auth/AuthContext';

import App from './App.tsx';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

// Create a client for the react-query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
          <App />
        </CookiesProvider>
      </AuthProvider>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
    </QueryClientProvider>
  </React.StrictMode>,
);
