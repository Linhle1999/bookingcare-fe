import { useRoutes } from 'react-router-dom'
import Home from './components/Home/Home'
import ChatBot from './components/ChatBot/ChatBox'
import LoginForm from './components/Login/LoginForm'
import RegisterForm from './components/Register/RegisterForm'
import SurveyQuestions from './components/SurveyQuestions/SurveyQuestions'
import DoctorList from './components/Reservation/DoctorList'
import BookingForm from './components/Reservation/BookingForm'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <Home />
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
    },
    {
      path: '/danh-sach-bac-si',
      element: <DoctorList />
    },
    {
      path: '/thong-tin-dat-lich',
      element: <BookingForm />
    }
  ])
  return routeElements
}
