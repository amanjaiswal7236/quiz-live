import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "~/components/ui/button";

type QuizDetailsProps = {
  quiz: {
    title: string
    description: string
  }
  updateQuiz: (updates: { title: string; description: string }) => void
}

export default function QuizDetails({ quiz, updateQuiz }: QuizDetailsProps) {
  const [title, setTitle] = useState(quiz.title)
  const [description, setDescription] = useState(quiz.description)
  const formRef = useRef(null)

  // useEffect(() => {
  //   gsap.from(formRef.current, {
  //     y: 20,
  //     opacity: 0,
  //     duration: 0.5,
  //     ease: "power3.out",
  //   })
  // }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateQuiz({ title, description })
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-lg font-medium text-gray-700">
          Quiz Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-lg font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          required
        />
      </div>
      <Button type="submit">Save Details</Button>
    </form>
  )
}

