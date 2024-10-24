import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = () => {
  const [username, setUsername] = useState<string | null>(null)
  const navigate = useNavigate()

  // Kiểm tra cookies để tìm access_token và username
  useEffect(() => {
    const accessToken = Cookies.get('access_token')
    // const savedUsername = Cookies.get('username') // Lưu tên người dùng khi đăng nhập
    const savedUsername = 'Gia Hân' // Lưu tên người dùng khi đăng nhập
    if (accessToken && savedUsername) {
      setUsername(savedUsername) // Cập nhật username từ cookies
    }
  }, [])

  // Xử lý logout, xóa token và điều hướng về trang chủ
  const handleLogout = () => {
    Cookies.remove('access_token') // Xóa access_token khỏi cookies
    Cookies.remove('username') // Xóa username khỏi cookies
    setUsername(null) // Reset lại trạng thái username
    navigate('/') // Điều hướng về trang chủ sau khi logout
  }

  return (
    <>
      <header className='flex w-full bg-[#EDFFFA]'>
        <div className='flex h-[78px] w-4/5 mx-auto items-center lg:w-lg justify-between'>
          <div className='w-1/5 flex items-center'>
            <Link to='/' className='cursor-pointer'>
              <img
                className='w-[200px] h-[43px]'
                src='https://bookingcare.vn/assets/icon/bookingcare-2020.svg'
                alt=''
              />
            </Link>
          </div>
          <div className='w-4/5 flex flex-row gap-x-3 justify-end'>
            <div className='cursor-pointer px-4 py-2 hover:bg-green-400 hover:text-white rounded'>
              <Link to='/danh-sach-bac-si'>Danh sách bác sĩ</Link>
            </div>
            <div className='cursor-pointer px-4 py-2 hover:bg-green-400 hover:text-white rounded'>
              <Link to='/'>Thông tin về phòng khám</Link>
            </div>

            {/* Nếu có username, hiển thị "Hello, [tên người dùng]" */}
            {username ? (
              <div className='relative'>
                <button className='cursor-pointer px-4 py-2 hover:bg-green-400 hover:text-white rounded'>
                  Hello, {username}
                </button>
                <div className='absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg'>
                  <button
                    onClick={handleLogout}
                    className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className='cursor-pointer px-4 py-2 hover:bg-green-400 hover:text-white rounded'>
                <Link to='/login'>Đăng nhập</Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
