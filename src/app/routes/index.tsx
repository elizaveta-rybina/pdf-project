import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { CompressPage } from 'pages/CompressPage'
import { ImagePdfPage } from 'pages/ImagePdfPage'
import { MainPage } from 'pages/MainPage'
import { MergePage } from 'pages/MergePage'
import { OfficeToPdfPage } from 'pages/OfficeToPdfPage'
import { PdfToImagePage } from 'pages/PdfToImagePage'

import { HtmlToPdfPage } from 'pages/HtmlToPdfPage'
import { Layout } from 'shared/ui/Layout'

interface Route {
  path: string;
  element: JSX.Element;
}

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
  {
    path: '/imageToPdf',
    element: (
      <Layout>
        <ImagePdfPage />
      </Layout>
    ),
  },
  {
    path: '/htmlToPdf',
    element: (
      <Layout>
        <HtmlToPdfPage />
      </Layout>
    ),
  },
  {
    path: '/pdfToImage',
    element: (
      <Layout>
        <PdfToImagePage />
      </Layout>
    ),
  },
];

export const AppRoutes = () => {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};
