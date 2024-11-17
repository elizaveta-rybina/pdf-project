import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
   //element: < />,
  },
  {
    path: '/about',
    //element: <AboutPage />,
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
