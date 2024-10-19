import React, { useState, useEffect } from 'react'
import * as RadixRadioGroup from '@radix-ui/react-radio-group'

interface Answer {
  answer: string
  point: number
}

interface Question {
  id: number
  questionTitle: string
  answers: Answer[]
}

const DepressionTest: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedPoints, setSelectedPoints] = useState<number | null>(null)
  const [totalPoints, setTotalPoints] = useState(0)
  const [userAnswers, setUserAnswers] = useState<number[]>([]) // Lưu điểm của từng câu hỏi
  const [loading, setLoading] = useState(true) // Trạng thái loading
  const [error, setError] = useState<string | null>(null) // Lưu lỗi (nếu có)

  // Gọi API từ URL
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:8080/questions') // Gọi API
        if (!response.ok) {
          throw new Error('Failed to fetch questions')
        }
        const data = await response.json()
        setQuestions(data.data) // Lấy dữ liệu câu hỏi từ API và set vào state
        setLoading(false) // Tắt trạng thái loading khi hoàn thành
      } catch (err: any) {
        setError(err.message) // Set thông báo lỗi nếu có
        setLoading(false)
      }
    }

    fetchQuestions() // Gọi hàm fetch khi component render
  }, [])

  // Xử lý khi chọn câu trả lời
  const handleAnswerSelect = (point: number) => {
    setSelectedPoints(point)
  }

  // Xử lý khi nhấn nút "Câu hỏi kế tiếp"
  const handleNextQuestion = () => {
    if (selectedPoints !== null) {
      setUserAnswers((prev) => [...prev, selectedPoints])
      setTotalPoints((prev) => prev + selectedPoints)
      setSelectedPoints(null) // Reset lựa chọn
      setCurrentQuestionIndex((prev) => prev + 1) // Tăng chỉ số câu hỏi hiện tại
    }
  }

  // Xử lý khi nhấn nút "Quay lại"
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const lastAnswer = userAnswers.pop() // Lấy câu trả lời gần nhất
      setTotalPoints((prev) => prev - (lastAnswer || 0)) // Trừ điểm câu gần nhất
      setCurrentQuestionIndex((prev) => prev - 1) // Quay lại câu trước
      setSelectedPoints(userAnswers[currentQuestionIndex - 1] || null) // Hiển thị lựa chọn trước đó
    }
  }

  // Khi hoàn thành tất cả câu hỏi, tính kết quả
  const renderResult = () => {
    let resultMessage = ''

    if (totalPoints < 14) {
      resultMessage = 'Không biểu hiện trầm cảm'
    } else if (totalPoints >= 14 && totalPoints <= 19) {
      resultMessage = 'Trầm cảm nhẹ'
    } else if (totalPoints >= 20 && totalPoints <= 29) {
      resultMessage = 'Trầm cảm vừa'
    } else {
      resultMessage = 'Trầm cảm nặng'
    }

    return (
      <div className='mt-8'>
        <h3 className='text-2xl font-bold'>Kết quả</h3>
        <p className='mt-2'>Tổng số điểm của bạn: {totalPoints}</p>
        <p className='mt-2'>Đánh giá: {resultMessage}</p>
      </div>
    )
  }

  if (loading) {
    return <div>Loading...</div> // Hiển thị trạng thái đang tải
  }

  if (error) {
    return <div>Error: {error}</div> // Hiển thị thông báo lỗi
  }

  return (
    <div className='max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded'>
      {currentQuestionIndex < questions.length ? (
        <>
          <h2 className='text-2xl font-bold mb-6'>
            Câu {currentQuestionIndex + 1}: {questions[currentQuestionIndex].questionTitle}
          </h2>

          <RadixRadioGroup.Root
            className='space-y-4'
            value={selectedPoints !== null ? selectedPoints.toString() : ''}
            onValueChange={(value) => handleAnswerSelect(Number(value))}
          >
            {questions[currentQuestionIndex].answers.map((answer, index) => (
              <RadixRadioGroup.Item
                key={index}
                value={answer.point.toString()}
                className={`cursor-pointer p-2 rounded-md border ${
                  selectedPoints === answer.point ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}
              >
                {answer.answer}
              </RadixRadioGroup.Item>
            ))}
          </RadixRadioGroup.Root>

          <div className='mt-6 flex justify-between'>
            <button
              className='bg-gray-300 text-black py-2 px-4 rounded disabled:opacity-50'
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Quay lại
            </button>
            <button
              className='bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50'
              onClick={handleNextQuestion}
              disabled={selectedPoints === null}
            >
              Câu hỏi kế tiếp
            </button>
          </div>
        </>
      ) : (
        renderResult() // Hiển thị kết quả sau khi hoàn thành bài test
      )}
    </div>
  )
}

export default DepressionTest
