import React, {lazy} from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from 'shared/ui/Layout';
import { MainPage } from 'pages/MainPage';

export const routes = [
  {
    path: '/',
    element: (
      <Layout>
        <MainPage />
      </Layout>
    ),
  },
];

export const AppRoutes = () => {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};
