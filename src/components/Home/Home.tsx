/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react'
import SurveyQuestions from '../SurveyQuestions/SurveyQuestions'
import bannerImg from '../../assets/images/banner.jpg'
import khamChuyenKhoaIcon from '../../assets/icons/services/icon-kham-chuyen-khoa.webp'
import khamTongQuatIcon from '../../assets/icons/services/icon-kham-tong-quat.webp'
import sucKhoeTinhThanIcon from '../../assets/icons/services/icon-suc-khoe-tinh-than.webp'
import baiTestSucKhoeIcon from '../../assets/icons/services/icon-bai-test-suc-khoe.webp'
import yTeGanNhaIcon from '../../assets/icons/services/icon-near-home.webp'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [showPopup, setShowPopup] = useState(false)
  const [surveyStarted, setSurveyStarted] = useState(false) // State mới để theo dõi khi bắt đầu làm bài test
  const listServices = [
    {
      name: 'Khám chuyên khoa',
      icon: khamChuyenKhoaIcon
    },
    {
      name: 'Khám tổng quát',
      icon: khamTongQuatIcon
    },
    {
      name: 'Sức khoẻ tinh thần',
      icon: sucKhoeTinhThanIcon
    },
    {
      name: 'Bài test sức khoẻ',
      icon: baiTestSucKhoeIcon
    },
    {
      name: 'Y tế gần bạn',
      icon: yTeGanNhaIcon
    }
  ]

  const listServicesContent = listServices.map((service) => (
    <div className='flex gap-x-8 p-6 items-center w-full border border-gray-300 rounded-xl' key={service.name}>
      <img className='h-16' src={service.icon} alt={service.name} />
      <span className='font-bold text-xl'>{service.name}</span>
    </div>
  ))

  useEffect(() => {
    if (surveyStarted) {
      navigate('/survey')
    }
  }, [surveyStarted])

  const handleButtonClick = () => {
    setShowPopup(true) // Hiển thị popup khi click vào button
  }

  const handleStartSurvey = () => {
    setSurveyStarted(true) // Đánh dấu rằng bài test đã được bắt đầu
    setShowPopup(false) // Ẩn popup khi bắt đầu làm bài test
  }

  const handleOverlayClick = () => {
    setShowPopup(false) // Ẩn popup khi click ra ngoài
  }

  const handlePopupClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation() // Ngăn chặn sự kiện click từ phát sinh ra ngoài popup
  }

  return (
    <div className=' w-full'>
      <div className='flex'>
        <div className='w-full relative'>
          <img className='w-full h-[600px] object-center object-cover' src={bannerImg} alt='banner' />
          <div className='bg-black absolute top-0 left-0 w-full h-full opacity-30 z-10'></div>
          <div className='w-[90%] mx-auto'>
            <div className='absolute top-1/3 left-[10%] z-20 flex flex-col gap-y-4'>
              <span className='text-5xl font-bold text-white'>Booking Care</span>
              <span className='xl:text-4xl text-3xl font-bold text-white'>
                Nơi chăm sóc sức khoẻ tinh thần cho mọi người
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full xl:w-4/5 mx-auto mt-20'>
        <div className='flex flex-col gap-y-4 mb-10'>
          <h3 className='text-2xl font-bold'>Dịch vụ toàn diện</h3>
          <div className='grid xl:grid-cols-2 grid-cols-1 gap-8'>{listServicesContent}</div>
        </div>
        <div className='flex justify-between pb-9'>
          <h6 className='text-2xl font-semibold'>Bài Test đánh giá trầm cảm Beck </h6>
        </div>
        <div className='md:relative w-full  h-[200px] sm:h-[300px] md:h-[380px] '>
          <img
            className='md:absolute inset-0 w-full h-full object-cover block'
            src='https://cdn.bookingcare.vn/fo/w1920/2023/12/27/170354-test-beck.png'
            alt=''
          />
        </div>
        <div className='py-5'>
          <p className=' pt-4 pb-2'>
            <strong>Bài Test đánh giá trầm cảm Beck </strong> Bài test mức độ trầm cảm BECK là một trong những phương
            pháp nhằm đánh giá về cảm xúc và mức độ trầm cảm tương đối phổ biến, được sử dụng trong các bệnh viện, phòng
            khám chuyên sâu về sức khoẻ tinh thần hiện nay.
          </p>
          <p className='py-2'>Bài test nhằm mục đích:</p>
          <ul className='py-2 list-disc px-10'>
            <li>Tự đánh giá tình trạng Sức khoẻ tinh thần cá nhân.</li>
            <li>Dự đoán về Sức khoẻ tinh thần và có kế hoạch thăm khám phù hợp.</li>
            <li>Tổng hợp thông tin để thuận tiện khi thăm khám với Bác sĩ/Chuyên gia</li>
          </ul>
          <p className='py-2'>
            <strong>Nguyên tắc thực hiện bài test:</strong>
          </p>
          <p className='py-2'>
            Hãy đọc mỗi câu hỏi sau và chọn đáp án gần giống nhất với{' '}
            <strong>tình trạng mà bạn cảm thấy trong suốt một tuần qua</strong>. Không có câu trả lời đúng hay sai. Và
            đừng dừng lại quá lâu ở bất kỳ câu nào.
          </p>
          <p className='py-2'>
            <strong>Lưu ý:</strong>
          </p>
          <p className='py-2'>
            Kết quả bài test này chỉ mang tính chất tham khảo, không có giá trị thay thế chẩn đoán y khoa bởi bác
            sĩ/chuyên gia có chuyên môn.
          </p>
          <p className='py-2'>
            <strong>Nguồn tham khảo:</strong>
          </p>
          <p className='py-2'>
            <strong>
              <a href='/' className='text-primary'>
                Viện Sức khỏe Tâm thần, Bệnh viện Bạch Mai
              </a>
            </strong>
          </p>
        </div>
        <div className='flex justify-center pt-2 pb-20'>
          <button
            onClick={handleButtonClick}
            className='w-1/2 bg-yellow-400 text-white py-2 rounded-sm text-xl font-semibold outline-primary'
          >
            BẮT ĐẦU
          </button>
        </div>
      </div>

      {showPopup && (
        <div
          className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'
          onClick={handleOverlayClick}
          // eslint-disable-next-line react/jsx-no-comment-textnodes
        >
          <div
            className='fixed bottom-0 left-0 right-0 top-0 m-auto h-[285px] w-[90%] rounded-[10px] bg-white px-5 pt-2 md:h-[336px] md:w-[48%]'
            onClick={handlePopupClick}
          >
            <div className='absolute right-2 top-2 md:right-4 md:top-4'>
              <button onClick={() => setShowPopup(false)}>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'
                    fill='#312f2f'
                  />
                </svg>
              </button>
            </div>
            <div className='mt-4 md:mt-2 text-center text-22 font-bold text-black md:text-24 text-md'>
              Vui lòng cho biết lý do bạn làm bài test này
            </div>
            <div className='flex items-end'>
              <div className='flex flex-col justify-center mx-auto mt-4 w-[290px] border-1 border-[#62BAC3] rounded-3xl md:mt-9 md:w-[494px] '>
                <button
                  onClick={handleStartSurvey}
                  className='h-14 px-7 py-2 my-2 text-center text-sm font-medium text-black border taiwin hover:bg-[rgba(69,190,229,1)] hover:text-white md:px-0 rounded-2xl border-primary'
                >
                  Tình cờ biết đến bài test, muốn làm thử
                </button>
                <button
                  onClick={handleStartSurvey}
                  className='h-14 px-7 py-2 my-2 text-center text-sm font-medium text-black border taiwin hover:bg-[rgba(69,190,229,1)] hover:text-white md:px-0 rounded-2xl border-primary '
                >
                  Đang gặp vấn đề tâm lý, cần tìm giải pháp hỗ trợ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <div className='-md mx-auto my-6 w-9/12'>
        <h3>Bạn đã hoàn thành Bài Test</h3>
        <div className='w-full h-72 bg-slate-50 rounded-sm mt-4 py-11 px-6 border-spacing-x-px shadow-xl'>
          <p className='font-medium'>Điểm Stress:</p>
          <p className='font-semibold text-center flex justify-center pt-12 text-6xl'>10</p>
          <p className='pt-16 font-semibold'>
            Đánh giá Stress: Bạn không có dấu hiệu gặp rối loạn Stress (Bình thường)
          </p>
        </div>
      </div> */}
      {/* END  */}
    </div>
  )
}

export default Home
