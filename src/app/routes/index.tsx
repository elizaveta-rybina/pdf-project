import { CompressPage } from 'pages/CompressPage'
import { MainPage } from 'pages/MainPage'
import { MergePage } from 'pages/MergePage'
import { OfficeToPdfPage } from 'pages/OfficeToPdfPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from 'shared/ui/Layout'

// Define route types if you're using TypeScript
interface Route {
  path: string;
  element: JSX.Element;
}

// Define the route array with types
const routes: Route[] = [
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
  {
    path: '/merge',
    element: (
      <Layout>
        <MergePage />
      </Layout>
    ),
  },
  {
    path: '/officeToPdf',
    element: (
      <Layout>
        <OfficeToPdfPage />
      </Layout>
    ),
  },
];

export const AppRoutes = () => {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};
