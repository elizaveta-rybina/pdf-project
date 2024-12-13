import { MainPage } from 'pages/MainPage'
import { MergePage } from 'pages/MergePage'
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
    path: '/merge',
    element: (
      <Layout>
        <MergePage />
      </Layout>
    ),
  },
];

export const AppRoutes = () => {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};
