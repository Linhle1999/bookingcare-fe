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

const SurveyQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null)
  const [totalPoints, setTotalPoints] = useState(0)
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // New states for form submission
  const [userResponses, setUserResponses] = useState<{ questionId: number; answerId: number }[]>([])
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)

  // const questionCallApi: Question[] = [...questionsTest]
  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:8080/questions')
        if (!response.ok) {
          throw new Error('Failed to fetch questions')
        }
        const data = await response.json()
        setQuestions(data)
        // setQuestions(questionCallApi)
        setLoading(false)
      } catch (err: any) {
        setError(err.message)
        setLoading(false)
      }
    }
    fetchQuestions()
  }, [])

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswerIndex(index)
  }

  const handleNextQuestion = () => {
    if (selectedAnswerIndex !== null) {
      const selectedAnswer = questions[currentQuestionIndex].answers[selectedAnswerIndex]
      setUserAnswers((prev) => [...prev, selectedAnswerIndex])
      setTotalPoints((prev) => prev + selectedAnswer.point)

      // Save answer in userResponses array
      setUserResponses((prev) => [
        ...prev,
        { questionId: questions[currentQuestionIndex].id, answerId: selectedAnswerIndex + 1 }
      ])

      setSelectedAnswerIndex(null)
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  // Xử lý khi nhấn nút "Quay lại"
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const lastAnswerIndex = userAnswers.pop() // Lấy câu trả lời gần nhất
      const lastAnswer = questions[currentQuestionIndex - 1].answers[lastAnswerIndex || 0]
      setTotalPoints((prev) => prev - (lastAnswer?.point || 0))
      setCurrentQuestionIndex((prev) => prev - 1)
      setSelectedAnswerIndex(lastAnswerIndex || null)

      // Remove the last answer from userResponses
      setUserResponses((prev) => prev.slice(0, -1))
    }
  }

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

        {/* Additional form for user information */}
        <form className='mt-6' onSubmit={handleSubmit}>
          <label className='block mb-2'>Họ và tên</label>
          <input
            type='text'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className='w-full mb-4 p-2 border rounded'
          />
          <label className='block mb-2'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full mb-4 p-2 border rounded'
          />
          <button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded'>
            Lưu kết quả
          </button>
        </form>

        {/* Display submit message */}
        {submitMessage && <p className='mt-4'>{submitMessage}</p>}
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const submissionData = {
      email,
      fullName,
      content: userResponses
    }

    try {
      const response = await fetch('http://localhost:8080/questions/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      })
      if (response.ok) {
        setSubmitMessage('Kết quả đã được lưu thành công!')
      } else {
        setSubmitMessage('Đã có lỗi xảy ra khi lưu kết quả!')
      }
    } catch (error) {
      setSubmitMessage('Không thể kết nối đến máy chủ!')
    }
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
                value={index.toString()}
                className={`flex flex-row cursor-pointer p-2 rounded-md border ${
                  selectedAnswerIndex === index ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}
              >
                <span className='mr-2'>{answerLabels[index]}.</span>
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

export default SurveyQuestions
