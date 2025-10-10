import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  HomePage,
  AboutPage,
  WorkPage,
  ProfilePage,
  GuestBookPage,
  ArchivePage,
  WorkDetailPage,
} from '@/pages';
import { Layout } from '@/components';
import { ROUTES } from '@/constants';

/**
 * 애플리케이션 라우터 설정
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout color="primary" />,
    children: [
      {
        path: ROUTES.HOME,
        element: <AboutPage />,
      },
      {
        path: ROUTES.WORK,
        element: <WorkPage />,
      },
      {
        path: ROUTES.GUESTBOOK,
        element: <GuestBookPage />,
      },
    ],
  },
  {
    path: '/',
    element: <Layout color="black" />,
    children: [
      {
        path: ROUTES.WORK_DETAIL,
        element: <WorkDetailPage />,
      },
    ],
  },
  {
    path: '/',
    element: <Layout color="white" />,
    children: [
      {
        path: ROUTES.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: ROUTES.ARCHIVE,
        element: <ArchivePage />,
      },
    ],
  },
  {
    path: '*',
    element: (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 mb-8">페이지를 찾을 수 없습니다.</p>
          <a
            href="/"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            홈으로 돌아가기
          </a>
        </div>
      </div>
    ),
  },
]);

interface RouterProps { }

const Router = (props: RouterProps) => {
  return <RouterProvider router={router} />;
};

export default Router;
