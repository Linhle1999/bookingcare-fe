import * as Dialog from '@radix-ui/react-dialog'
import React from 'react'
import { IDoctor } from 'src/models/doctor'
import AppointmentForm from './AppointmentForm'

type IProps = {
  doctor: IDoctor
}

export const ListDoctorItem = ({ doctor }: IProps) => {
  return (
    <>
      <div className='w-full flex flex-row border rounded-lg shadow'>
        {/* Thông tin bác sĩ */}
        <div className='w-1/2 p-3 flex flex-row gap-4'>
          <div className='w-fit flex items-start'>
            <img className='w-28 rounded-full' src={doctor.image} alt={doctor.name} />
          </div>
          <div className='flex flex-col gap-y-2'>
            <span className='font-bold'>{doctor.name}</span>
            <span className='text-sm'>{doctor.experience}</span>
            <span className='text-sm'>{doctor.workPlace}</span>
            <div>
              <img src='' alt='' />
            </div>
          </div>
        </div>
        {/* Chọn lịch khám */}
        <div className='w-1/2 p-3 flex flex-col gap-y-2 border-l'>
          <div className='flex flex-row gap-2 items-center'>
            <div>Chọn lịch khám</div>
            <select className='px-2 py-1 border rounded' name={`list-day-${doctor.id}`} id='listday'>
              <option value='Monday'>Thứ 2</option>
              <option value='Tuesday'>Thứ 3</option>
              <option value='Wednesday'>Thứ 4</option>
              <option value='Thursday'>Thứ 5</option>
              <option value='Friday'>Thứ 6</option>
              <option value='Saturday'>Thứ 7</option>
              <option value='Sunday'>Chủ nhật</option>
            </select>
          </div>
          <div className='grid grid-cols-4 gap-2'>
            {doctor.listTime.map((item) => (
              <div className=' flex flex-row items-center gap-x-1' key={`${item.time}-${doctor.id}`}>
                <input type='radio' name={`time-${doctor.id}`} id={`${item.time}-${doctor.id}`} />
                <label className='text-sm font-semibold' htmlFor={`${item.time}-${doctor.id}`}>
                  {item.time}
                </label>
              </div>
            ))}
          </div>
          <div className='text-xs'>Chọn và đặt (Phí đặt lịch 0đ)</div>
          <div className='flex relative'>
            <Dialog.Root>
              <Dialog.Trigger>
                <button className='bg-primary text-white rounded px-4 py-2 text-sm'>Đặt lịch</button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className='bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0' />
                <Dialog.Content className='data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%]  focus:outline-none overflow-auto'>
                  <AppointmentForm doctor={doctor} />
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
          <hr />
          <div className='text-sm'>
            <strong>Giá tư vấn: </strong>
            tùy theo từng trường hợp
          </div>
        </div>
      </div>
    </>
  )
}
