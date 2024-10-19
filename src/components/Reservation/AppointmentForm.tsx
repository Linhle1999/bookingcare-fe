import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import * as RadixSelect from '@radix-ui/react-select'
import * as Dialog from '@radix-ui/react-dialog'
import { IDoctor } from 'src/models/doctor'

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Vui lòng nhập tên'),
  phone: Yup.string().required('Vui lòng nhập số điện thoại'),
  email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  timeSlot: Yup.string().required('Vui lòng chọn khung giờ'),
  date: Yup.string().required('Vui lòng chọn ngày')
})

type IProps = {
  doctor: IDoctor
}
const AppointmentForm: React.FC<IProps> = ({ doctor }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      timeSlot: '',
      date: ''
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form values:', values)
      alert('Đặt lịch thành công!')
    }
  })

  return (
    <div className='max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>Đặt lịch khám bệnh</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Tên */}
        <div className='mb-4'>
          <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
            Tên
          </label>
          <input
            id='name'
            name='name'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className='mt-1 p-2 border border-gray-300 rounded-md w-full'
          />
          {formik.touched.name && formik.errors.name ? (
            <p className='text-red-500 text-sm'>{formik.errors.name}</p>
          ) : null}
        </div>

        {/* Số điện thoại */}
        <div className='mb-4'>
          <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
            Số điện thoại
          </label>
          <input
            id='phone'
            name='phone'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className='mt-1 p-2 border border-gray-300 rounded-md w-full'
          />
          {formik.touched.phone && formik.errors.phone ? (
            <p className='text-red-500 text-sm'>{formik.errors.phone}</p>
          ) : null}
        </div>

        {/* Email */}
        <div className='mb-4'>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className='mt-1 p-2 border border-gray-300 rounded-md w-full'
          />
          {formik.touched.email && formik.errors.email ? (
            <p className='text-red-500 text-sm'>{formik.errors.email}</p>
          ) : null}
        </div>

        <div className='mb-4'>
          <label htmlFor='doctor' className='block text-sm font-medium text-gray-700'>
            Bác sĩ
          </label>
          <input
            id='doctor'
            name='doctor'
            type='text'
            value={doctor.fullName}
            className='mt-1 p-2 border border-gray-300 rounded-md w-full'
            readOnly
          />
        </div>

        {/* Ngày */}
        <div className='mb-4'>
          <label htmlFor='date' className='block text-sm font-medium text-gray-700'>
            Ngày
          </label>
          <input
            id='date'
            name='date'
            type='date'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date}
            className='mt-1 p-2 border border-gray-300 rounded-md w-full'
          />
          {formik.touched.date && formik.errors.date ? (
            <p className='text-red-500 text-sm'>{formik.errors.date}</p>
          ) : null}
        </div>

        {/* Khung giờ */}
        <div className='mb-4'>
          <label htmlFor='timeSlot' className='block text-sm font-medium text-gray-700'>
            Khung giờ
          </label>
          <input
            id='timeSlot'
            name='timeSlot'
            type='text'
            value={formik.values.timeSlot}
            disabled
            className='mt-1 p-2 border border-gray-300 rounded-md w-full bg-gray-100 text-gray-700'
          />
          {formik.touched.timeSlot && formik.errors.timeSlot ? (
            <p className='text-red-500 text-sm'>{formik.errors.timeSlot}</p>
          ) : null}
        </div>

        {/* Nút submit */}
        <Dialog.Close asChild>
          <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'>
            Đặt lịch
          </button>
        </Dialog.Close>
      </form>
    </div>
  )
}

export default AppointmentForm
