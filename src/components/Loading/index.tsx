import { Spinner } from 'flowbite-react'

const LoadingOverlay = () => {
  return (
    <div className='w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50'>
      <div className='flex justify-center items-center mt-[50vh]'>
        <Spinner color='info' aria-label='Info spinner example' size='xl' />
      </div>
    </div>
  )
}

export default LoadingOverlay
