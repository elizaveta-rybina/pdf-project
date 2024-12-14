import { CompressPage } from 'pages/CompressPage'
import { MainPage } from 'pages/MainPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from 'shared/ui/Layout'

export const routes = [
  {
    path: '/',
    element: (
      <Layout>
        <MainPage />
      </Layout>
    ),
  },
  {
    path: '/compress',
    element: (
      <Layout>
        <CompressPage />
      </Layout>
    ),
  },
];

export const AppRoutes = () => {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};
