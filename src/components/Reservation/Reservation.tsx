import { doctors } from 'src/assets/data/data'
import { IDoctor } from 'src/models/doctor'
import { ListDoctorItem } from './ListDoctorItem'

const Reservation = () => {
  const listDoctors = doctors.map((doctor: IDoctor) => (
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
            <span>
              - Chuyên gia được đào tạo bài bản về chuyên ngành Tâm lý tại các trường đại học trong nước và quốc tế.
            </span>
            <span>
              - Nhà Tâm lý học là những người có nhiều kinh nghiệm trong lĩnh vực tâm lý, chăm sóc sức khỏe tinh thần.
            </span>
            <span>
              - Các nhà chuyên môn nghiên cứu, tư vấn và trị liệu theo các phương pháp tiếp cận mới, hiệu quả.
            </span>
            <span>- Lắng nghe và thấu hiểu khách hàng để giúp họ vượt qua khó khăn của bản thân.</span>
          </div>
          <div className='flex flex-col gap-y-2'>
            <span className='text-lg font-bold'>Tư vấn và trị liệu</span>
            <span>- Khó khăn, rối nhiễu tâm lý</span>
            <span>- Phát triển cá nhân</span>
            <span>- Mâu thuẫn, lạm dụng và tổn thương tâm lý</span>
            <span>- Tái hòa nhập xã hội</span>
            <span>- Vấn đề khuyết tật và nhóm yếu thế</span>
            <span>- Những vấn đề của vị thành niên</span>
            <span>- Giới tính và tình dục</span>
            <span>- Những vấn đề trong mối quan hệ gia đình</span>
          </div>
          <div className='font-semibold italic'>
            Ngoài những vấn đề nêu trên, khách hàng có thể liên hệ với chúng tôi để được hỗ trợ, sắp xếp lịch tư vấn phù
            hợp
          </div>
        </div>
        <div className='flex flex-col'>
          <ul className='flex flex-col gap-y-4'>{listDoctors}</ul>
        </div>
      </div>
    </>
  )
}

export default Reservation
