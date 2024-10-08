import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import * as RadixLabel from '@radix-ui/react-label'

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string().required('Vui lòng nhập tên đăng nhập').min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự'),
  password: Yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
})

const LoginForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form values:', values)
      alert('Đăng nhập thành công!')
    }
  })

  return (
    <div className='max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border my-20'>
      <h2 className='text-2xl font-bold mb-6 text-center'>Đăng nhập</h2>
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

        {/* Nút submit */}
        <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'>
          Đăng nhập
        </button>
        <div className='mt-4'>
          <span>
            Bạn chưa có tài khoản?{' '}
            <a className='text-blue-500' href='/register'>
              Đăng ký ngay!
            </a>
          </span>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
