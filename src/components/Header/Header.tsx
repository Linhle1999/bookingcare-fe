import React from 'react'

import { Link } from 'react-router-dom'

const Header = () => {
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
              <Link to='/dat-lich'>Đặt lịch</Link>
            </div>
            <div className='cursor-pointer px-4 py-2 hover:bg-green-400 hover:text-white rounded'>
              <Link to='/'>Thông tin về phòng khám</Link>
            </div>
            <div className='cursor-pointer px-4 py-2 hover:bg-green-400 hover:text-white rounded'>
              <Link to='/login'>Đăng nhập</Link>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
