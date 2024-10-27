import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Dialog from '@radix-ui/react-dialog'
import * as Yup from 'yup'
import Cookies from 'js-cookie'

interface BookingTimeDTO {
  id: number | null
  fromTime: string
  toTime: string
  price: number
  booked: boolean
}

const BookingForm: React.FC = () => {
  const location = useLocation()
  const doctor = location.state?.doctor

  const [availableTimes, setAvailableTimes] = useState<BookingTimeDTO[]>([])
  const [selectedDate, setSelectedDate] = useState('')
  const [loading, setLoading] = useState(false)

  // Hàm lấy thông tin giờ đặt lịch của bác sĩ theo ngày
  const fetchAvailableTimes = async (doctorId: number, bookingDate: string) => {
    try {
      setLoading(true)
      const response = await fetch(
        `http://localhost:8080/api/bookings/doctor?doctorId=${doctorId}&bookingDate=${new Date(bookingDate)}`
      )
      const data = await response.json()
      // const response = {
      //   status: 'OK',
      //   data: {
      //     doctorId: 2,
      //     bookingDate: '2024-10-24T12:55:32.700+00:00',
      //     bookingTimeDTOS: [
      //       {
      //         id: null,
      //         fromTime: '09:00:00',
      //         toTime: '10:00:00',
      //         price: 100.0,
      //         booked: true
      //       }
      //     ]
      //   }
      // }

      // setAvailableTimes(response.data.bookingTimeDTOS)
      setAvailableTimes(data.data.bookingTimeDTOS)
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu lịch đặt:', error)
    } finally {
      setLoading(false)
    }
  }

  // Xử lý khi thay đổi ngày
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value)
    if (doctor?.id && e.target.value) {
      fetchAvailableTimes(doctor.id, e.target.value)
    }
  }

  // Formik để quản lý form đặt lịch
  const formik = useFormik({
    initialValues: {
      patientName: '',
      phoneNumber: '',
      email: '',
      gender: '',
      dob: '',
      address: '',
      reason: '',
      bookingTimeId: '',
      bookingType: true
    },
    validationSchema: Yup.object({
      patientName: Yup.string().required('Vui lòng nhập tên'),
      phoneNumber: Yup.string().required('Vui lòng nhập số điện thoại'),
      email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
      gender: Yup.string().required('Vui lòng chọn giới tính'),
      dob: Yup.string().required('Vui lòng nhập ngày sinh'),
      address: Yup.string().required('Vui lòng nhập địa chỉ'),
      reason: Yup.string().required('Vui lòng nhập lý do tư vấn'),
      bookingTimeId: Yup.string().required('Vui lòng chọn thời gian tư vấn')
    }),
    onSubmit: async (values) => {
      const token = Cookies.get('access_token')
      const bookingData = {
        ...values,
        doctorId: doctor.id,
        bookingDate: new Date(selectedDate)
      }
      try {
        const response = await fetch('http://localhost:8080/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(bookingData)
        })
        const data = await response.json()
        console.log('Đặt lịch thành công:', data)
      } catch (error) {
        console.error('Lỗi khi đặt lịch:', error)
      }
    }
  })

  return (
    <div className='max-w-4xl mx-auto py-8'>
      <h1 className='text-2xl font-bold mb-4'>Thông tin đặt lịch tư vấn</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Tên bệnh nhân</label>
          <input
            type='text'
            name='patientName'
            value={formik.values.patientName}
            onChange={formik.handleChange}
            className='w-full p-2 border rounded'
          />
          {formik.errors.patientName && <p className='text-red-500 text-sm'>{formik.errors.patientName}</p>}
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Số điện thoại</label>
          <input
            type='text'
            name='phoneNumber'
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            className='w-full p-2 border rounded'
          />
          {formik.errors.phoneNumber && <p className='text-red-500 text-sm'>{formik.errors.phoneNumber}</p>}
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Email</label>
          <input
            type='email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            className='w-full p-2 border rounded'
          />
          {formik.errors.email && <p className='text-red-500 text-sm'>{formik.errors.email}</p>}
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Giới tính</label>
          <select
            name='gender'
            value={formik.values.gender}
            onChange={formik.handleChange}
            className='w-full p-2 border rounded'
          >
            <option value=''>Chọn giới tính</option>
            <option value='MALE'>Nam</option>
            <option value='FEMALE'>Nữ</option>
          </select>
          {formik.errors.gender && <p className='text-red-500 text-sm'>{formik.errors.gender}</p>}
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Ngày sinh</label>
          <input
            type='date'
            name='dob'
            value={formik.values.dob}
            onChange={formik.handleChange}
            className='w-full p-2 border rounded'
          />
          {formik.errors.dob && <p className='text-red-500 text-sm'>{formik.errors.dob}</p>}
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Địa chỉ</label>
          <input
            type='text'
            name='address'
            value={formik.values.address}
            onChange={formik.handleChange}
            className='w-full p-2 border rounded'
          />
          {formik.errors.address && <p className='text-red-500 text-sm'>{formik.errors.address}</p>}
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Lý do tư vấn</label>
          <textarea
            name='reason'
            value={formik.values.reason}
            onChange={formik.handleChange}
            className='w-full p-2 border rounded'
          />
          {formik.errors.reason && <p className='text-red-500 text-sm'>{formik.errors.reason}</p>}
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Ngày đặt lịch</label>
          <input type='date' value={selectedDate} onChange={handleDateChange} className='w-full p-2 border rounded' />
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Chọn khung giờ</label>
          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : (
            <select
              name='bookingTimeId'
              value={formik.values.bookingTimeId}
              onChange={formik.handleChange}
              className='w-full p-2 border rounded'
            >
              <option value=''>Chọn khung giờ</option>
              {availableTimes.map((time) => (
                <option key={time.id} value={time.id} disabled={time.booked}>
                  {time.fromTime} - {time.toTime} {time.booked && '(Đã đặt)'}
                </option>
              ))}
            </select>
          )}
          {formik.errors.bookingTimeId && <p className='text-red-500 text-sm'>{formik.errors.bookingTimeId}</p>}
        </div>

        <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'>
          Xác nhận đặt lịch
        </button>
      </form>
    </div>
  )
}

export default BookingForm
