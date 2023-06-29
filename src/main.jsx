import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppHeader from './components/AppHeader.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import MainPage from './components/MainPage.jsx';
import StreamerDetailsPage from './components/StreamerDetailsPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppHeader/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <MainPage/>
      },
      {
        path: '/streamer/:streamerId',
        element: <StreamerDetailsPage/>
      }
    ]
  },
  {
    path: '*',
    element: <><AppHeader /><NotFoundPage/></>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
     </QueryClientProvider>
  </React.StrictMode>,
)
