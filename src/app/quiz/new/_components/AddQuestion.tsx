import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "~/components/ui/button"

type QuestionType = "multiple-choice" | "true-false"

type Question = {
  id: string
  text: string
  type: QuestionType
  options: string[]
  correctAnswer: string | string[]
}

type AddQuestionProps = {
  addQuestion: (question: Question) => void
  questionCount: number
  editingQuestion?: Question
  onQuestionAdded: () => void
}

export default function AddQuestion({
  addQuestion,
  questionCount,
  editingQuestion,
  onQuestionAdded,
}: AddQuestionProps) {
  const [questionText, setQuestionText] = useState(editingQuestion?.text || "")
  const [questionType, setQuestionType] = useState<QuestionType>(editingQuestion?.type || "multiple-choice")
  const [options, setOptions] = useState(editingQuestion?.options || ["", "", "", ""])
  const [correctAnswer, setCorrectAnswer] = useState<string | string[]>(editingQuestion?.correctAnswer || "")
  const formRef = useRef(null)

  useEffect(() => {
    gsap.from(formRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    })
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const question: Question = {
      id: editingQuestion?.id || `q${questionCount + 1}`,
      text: questionText,
      type: questionType,
      options: questionType === "multiple-choice" ? options.filter(Boolean) : ["True", "False"],
      correctAnswer: questionType === "multiple-choice" ? correctAnswer || "" : (correctAnswer as string[])[0] || "",
    }
    addQuestion(question)
    onQuestionAdded()
    // Reset form
    setQuestionText("")
    setQuestionType("multiple-choice")
    setOptions(["", "", "", ""])
    setCorrectAnswer("")
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="questionText" className="block text-lg font-medium text-gray-700">
          Question Text
        </label>
        <input
          type="text"
          id="questionText"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          required
        />
      </div>
      <div>
        <label htmlFor="questionType" className="block text-lg font-medium text-gray-700">
          Question Type
        </label>
        <select
          id="questionType"
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value as QuestionType)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        >
          <option value="multiple-choice">Multiple Choice</option>
          <option value="true-false">True/False</option>
        </select>
      </div>
      {questionType === "multiple-choice" && (
        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">Options</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...options]
                newOptions[index] = e.target.value
                setOptions(newOptions)
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              placeholder={`Option ${index + 1}`}
              required={index < 2}
            />
          ))}
        </div>
      )}
      <div>
        <label htmlFor="correctAnswer" className="block text-lg font-medium text-gray-700">
          Correct Answer
        </label>
        {questionType === "multiple-choice" ? (
          <select
            id="correctAnswer"
            value={correctAnswer as string}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            required
          >
            <option value="">Select correct answer</option>
            {options.filter(Boolean).map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <select
            id="correctAnswer"
            value={correctAnswer as string}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            required
          >
            <option value="">Select correct answer</option>
            <option value="True">True</option>
            <option value="False">False</option>
          </select>
        )}
      </div>
      <Button type="submit">{editingQuestion ? "Update Question" : "Add Question"}</Button>
    </form>
  )
}

