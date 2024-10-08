import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import * as RadixLabel from '@radix-ui/react-label'

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string().required('Vui lòng nhập tên đăng nhập').min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự'),
  password: Yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  phoneNumber: Yup.string()
    .required('Vui lòng nhập số điện thoại')
    .matches(/^[0-9]+$/, 'Số điện thoại phải chỉ chứa chữ số')
    .min(10, 'Số điện thoại phải có ít nhất 10 chữ số')
})

const RegisterForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      phoneNumber: ''
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form values:', values)
      alert('Đăng ký thành công!')
    }
  })

  return (
    <div className='max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg my-20 border'>
      <h2 className='text-2xl font-bold mb-6 text-center'>Đăng ký</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Tên đăng nhập */}
        <div className='mb-4'>
          <RadixLabel.Root htmlFor='username' className='block text-sm font-medium text-gray-700'>
            Tên đăng nhập
          </RadixLabel.Root>
          <input
            id='username'
            name='username'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className='mt-1 p-2 border border-gray-300 rounded-md w-full'
          />
          {formik.touched.username && formik.errors.username ? (
            <p className='text-red-500 text-sm'>{formik.errors.username}</p>
          ) : null}
        </div>

        {/* Mật khẩu */}
        <div className='mb-4'>
          <RadixLabel.Root htmlFor='password' className='block text-sm font-medium text-gray-700'>
            Mật khẩu
          </RadixLabel.Root>
          <input
            id='password'
            name='password'
            type='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className='mt-1 p-2 border border-gray-300 rounded-md w-full'
          />
          {formik.touched.password && formik.errors.password ? (
            <p className='text-red-500 text-sm'>{formik.errors.password}</p>
          ) : null}
        </div>

        {/* Email */}
        <div className='mb-4'>
          <RadixLabel.Root htmlFor='email' className='block text-sm font-medium text-gray-700'>
            Email
          </RadixLabel.Root>
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

        {/* Số điện thoại */}
        <div className='mb-4'>
          <RadixLabel.Root htmlFor='phoneNumber' className='block text-sm font-medium text-gray-700'>
            Số điện thoại
          </RadixLabel.Root>
          <input
            id='phoneNumber'
            name='phoneNumber'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
            className='mt-1 p-2 border border-gray-300 rounded-md w-full'
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <p className='text-red-500 text-sm'>{formik.errors.phoneNumber}</p>
          ) : null}
        </div>

        {/* Nút submit */}
        <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'>
          Đăng ký
        </button>

        <div className='mt-4'>
          <span>
            Bạn đã có tài khoản!{' '}
            <a className='text-blue-500' href='/login'>
              Đăng nhập ngay!
            </a>
          </span>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
