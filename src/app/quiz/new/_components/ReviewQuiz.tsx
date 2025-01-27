import { useEffect, useRef } from "react"
import { gsap } from "gsap"

type Question = {
  id: string
  text: string
  type: "multiple-choice" | "true-false"
  options: string[]
  correctAnswer: string | string[]
}

type Quiz = {
  title: string
  description: string
  questions: Question[]
}

type ReviewQuizProps = {
  quiz: Quiz
}

export default function ReviewQuiz({ quiz }: ReviewQuizProps) {
  const reviewRef = useRef(null)
  const questionsRef = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    gsap.from(reviewRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    })

    questionsRef.current.forEach((question, index) => {
      gsap.from(question, {
        x: -20,
        opacity: 0,
        duration: 0.5,
        delay: index * 0.1,
        ease: "power3.out",
      })
    })
  }, [])

  return (
    <div ref={reviewRef} className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Review Your Colorful Quiz</h2>
      <div>
        <h3 className="text-xl font-medium text-gray-900">Title</h3>
        <p className="mt-1 text-lg text-gray-600">{quiz.title}</p>
      </div>
      <div>
        <h3 className="text-xl font-medium text-gray-900">Description</h3>
        <p className="mt-1 text-lg text-gray-600">{quiz.description}</p>
      </div>
      <div>
        <h3 className="text-xl font-medium text-gray-900">Questions</h3>
        <ul className="mt-1 space-y-4">
          {quiz.questions.map((question, index) => (
            <li
              key={question.id}
              ref={(el) => {
                questionsRef.current[index] = el;
              }}
              className="bg-gradient-to-r from-pink-100 to-yellow-100 p-4 rounded-md shadow-md"
            >
              <p className="font-medium text-gray-900">{question.text}</p>
              <p className="mt-1 text-sm text-gray-600">Type: {question.type}</p>
              {question.type === "multiple-choice" && (
                <ul className="mt-2 pl-5 list-disc">
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex} className="text-sm text-gray-600">
                      {option}
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-2 text-sm font-medium text-gray-900">
                Correct Answer:{" "}
                {Array.isArray(question.correctAnswer) ? question.correctAnswer.join(", ") : question.correctAnswer}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

