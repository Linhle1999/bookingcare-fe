import Header from 'src/components/Header/Header'
import { Outlet } from 'react-router-dom'

const UserPage = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default UserPage
