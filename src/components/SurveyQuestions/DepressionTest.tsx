import React, { useState, useEffect } from 'react'
import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { questionsTest } from 'src/assets/data/data'

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
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null) // Chọn theo chỉ số câu trả lời
  const [totalPoints, setTotalPoints] = useState(0)
  const [userAnswers, setUserAnswers] = useState<number[]>([]) // Lưu chỉ số của câu trả lời
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const questionCallApi: Question[] = [...questionsTest]

  // Gọi API từ URL
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // const response = await fetch('http://localhost:8080/questions')
        // if (!response.ok) {
        //   throw new Error('Failed to fetch questions')
        // }
        // const data = await response.json()
        // setQuestions(data.data)
        setQuestions(questionCallApi)
        setLoading(false)
      } catch (err: any) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  // Xử lý khi chọn câu trả lời
  const handleAnswerSelect = (index: number) => {
    setSelectedAnswerIndex(index)
  }

  // Xử lý khi nhấn nút "Câu hỏi kế tiếp"
  const handleNextQuestion = () => {
    if (selectedAnswerIndex !== null) {
      const selectedAnswer = questions[currentQuestionIndex].answers[selectedAnswerIndex]
      setUserAnswers((prev) => [...prev, selectedAnswerIndex])
      setTotalPoints((prev) => prev + selectedAnswer.point)
      setSelectedAnswerIndex(null) // Reset lựa chọn
      setCurrentQuestionIndex((prev) => prev + 1) // Tăng chỉ số câu hỏi hiện tại
    }
  }

  // Xử lý khi nhấn nút "Quay lại"
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const lastAnswerIndex = userAnswers.pop() // Lấy câu trả lời gần nhất
      const lastAnswer = questions[currentQuestionIndex - 1].answers[lastAnswerIndex || 0]
      setTotalPoints((prev) => prev - (lastAnswer?.point || 0)) // Trừ điểm câu gần nhất
      setCurrentQuestionIndex((prev) => prev - 1) // Quay lại câu trước
      setSelectedAnswerIndex(lastAnswerIndex || null) // Hiển thị lựa chọn trước đó
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
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  // Tạo danh sách A, B, C,... cho các câu trả lời
  const answerLabels = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ]

  return (
    <div className='max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded'>
      {currentQuestionIndex < questions.length ? (
        <>
          <h2 className='text-2xl font-bold mb-6'>
            Câu {currentQuestionIndex + 1}: {questions[currentQuestionIndex].questionTitle}
          </h2>

          <RadixRadioGroup.Root
            className='flex flex-col space-y-4'
            value={selectedAnswerIndex !== null ? selectedAnswerIndex.toString() : ''}
            onValueChange={(value) => handleAnswerSelect(Number(value))}
          >
            {questions[currentQuestionIndex].answers.map((answer, index) => (
              <RadixRadioGroup.Item
                key={index}
                value={index.toString()} // Chọn theo chỉ số câu trả lời
                className={`flex flex-row cursor-pointer p-2 rounded-md border ${
                  selectedAnswerIndex === index ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}
              >
                <span className='mr-2'>{answerLabels[index]}.</span> {/* Thêm A, B, C,... */}
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
              disabled={selectedAnswerIndex === null}
            >
              Câu hỏi kế tiếp
            </button>
          </div>
        </>
      ) : (
        renderResult()
      )}
    </div>
  )
}

export default DepressionTest
