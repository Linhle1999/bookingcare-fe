import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import * as RadixLabel from '@radix-ui/react-label'
import Cookies from 'js-cookie'
import { responseModal } from 'src/models/api-response'
import { jwtDecode } from 'jwt-decode'
import { useLoading } from 'src/contexts/loadingContext'

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string().required('Vui lòng nhập tên đăng nhập').min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự'),
  password: Yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
})

const LoginForm: React.FC = () => {
  const { startLoading, endLoading } = useLoading()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        startLoading()
        // Send the POST request to the login API
        const response = await fetch('http://localhost:8080/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: values.username,
            password: values.password
          })
        })

        // Check if the request was successful
        if (response.ok) {
          const result: responseModal = await response.json()
          console.log(result)

          // Set the token in cookies with a 30-minute expiration
          Cookies.set('token', result.data, { expires: 0.5 }) // 0.5 days = 30 minutes

          const userInfo = jwtDecode(result.data)
          console.log(userInfo)

          // Notify the user about successful login
          alert('Đăng nhập thành công!')

          // Redirect to the homepage or dashboard (optional)
          // window.location.href = '/dashboard'
        } else {
          // Handle error if the login fails
          alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.')
        }
      } catch (error) {
        console.error('Error logging in:', error)
        alert('Có lỗi xảy ra. Vui lòng thử lại sau.')
      } finally {
        endLoading()
      }
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
