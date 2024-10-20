import React, { useEffect, useState } from 'react'
import { ListDoctorItem } from './ListDoctorItem'
import axios from 'axios' // Axios or fetch can be used to make the API call
import { listAllDoctorsResponse } from 'src/models/api-response'
import { IDoctor } from 'src/models/doctor'

const Reservation = () => {
  const [doctors, setDoctors] = useState<IDoctor[]>([]) // State to hold doctors data
  const [loading, setLoading] = useState(true) // Loading state
  const [error, setError] = useState('') // Error state

  useEffect(() => {
    // Fetch doctors' information when component mounts
    const fetchDoctors = async () => {
      try {
        const response: listAllDoctorsResponse = await axios.get('http://localhost:8080/api/doctors') // Replace with your API endpoint
        console.log(response)
        setDoctors(response.data.items) // Update state with fetched doctors data
        setLoading(false) // Turn off loading state
      } catch (error) {
        setError('Failed to fetch doctors information')
        setLoading(false) // Turn off loading state even if there's an error
      }
    }

    fetchDoctors()
  }, []) // Empty dependency array to run only once when the component mounts

  if (loading) {
    return <p>Loading...</p> // Show loading state
  }

  if (error) {
    return <p>{error}</p> // Show error message if fetching fails
  }

  const listDoctors = doctors.map((doctor) => (
    <li key={doctor.id}>
      <ListDoctorItem doctor={doctor} />
    </li>
  ))

  return (
    <>
      <div className='flex flex-col max-w-[1208px] mx-auto mt-5 gap-y-8'>
        <h2 className='text-3xl font-bold'>Đặt lịch</h2>
        <div className='flex flex-col gap-y-4'>
          <h3 className='font-bold text-2xl'>Tư vấn, trị liệu tâm lý</h3>
          <div className='flex flex-col gap-y-2'>
            <span className='text-lg font-bold'>Chuyên gia tư vấn Tâm lý giỏi</span>
            <span>
              - BookingCare là Nền tảng Y tế chăm sóc Sức khỏe toàn diện, trong đó có cung cấp dịch vụ tư vấn tâm lý từ
              xa.
            </span>
            {/* Other content */}
          </div>
          <div className='flex flex-col'>
            <ul className='flex flex-col gap-y-4'>{listDoctors}</ul> {/* Render doctors */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Reservation
