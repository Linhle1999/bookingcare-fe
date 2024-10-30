import { Navigate, useRoutes } from 'react-router-dom'
import Home from './components/Home/Home'
import ChatBot from './components/ChatBot/ChatBox'
import Reservation from './components/Reservation/Reservation'
import LoginForm from './components/Login/LoginForm'
import RegisterForm from './components/Register/RegisterForm'
import SurveyQuestions from './components/SurveyQuestions/SurveyQuestions'
import AdminPage from './pages/admin'
import UnauthorisedPage from './pages/errors/unauthorised'
import UserPage from './pages/users'

export default function useRouteElements() {
  const userRole = 'admin'

  const routeElements = useRoutes([
    {
      path: '/',
      element: <UserPage />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: '/dat-lich',
          element: <Reservation />
        },
        {
          path: '/chatbot',
          element: <ChatBot />
        },
        {
          path: '/login',
          element: <LoginForm />
        },
        {
          path: '/register',
          element: <RegisterForm />
        },
        {
          path: '/survey',
          element: <SurveyQuestions />
        }
      ]
    },

    {
      path: '/unauthorised',
      element: <UnauthorisedPage />
    },
    {
      path: '/admin',
      element: userRole === 'admin' ? <AdminPage /> : <Navigate to='/unauthorised' />
    }
  ])
  return routeElements
}
