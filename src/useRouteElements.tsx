import { useRoutes } from 'react-router-dom'
import Home from './components/Home/Home'
import ChatBot from './components/ChatBot/ChatBox'
import Reservation from './components/Reservation/Reservation'
import LoginForm from './components/Login/LoginForm'
import RegisterForm from './components/Register/RegisterForm'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
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
    }
  ])
  return routeElements
}
