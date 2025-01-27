"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import QuizDetails from "./_components/QuizDetails"
import AddQuestion from "./_components/AddQuestion"
import ReviewQuiz from "./_components/ReviewQuiz"
import StepIndicator from "./_components/StepIndicator"
import { Button } from "~/components/ui/button"
import SuccessMessage from "./_components/SuccessMessage"
import MakeLiveDialog from "./_components/MakeLiveDialog"
import QuestionSidebar from "./_components/QuestionSidebar"
import { Sidebar, SidebarProvider } from "~/components/ui/sidebar"

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

export default function QuizCreator() {
  const [step, setStep] = useState(1)
  const [quiz, setQuiz] = useState<Quiz>({
    title: "",
    description: "",
    questions: [],
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [showMakeLiveDialog, setShowMakeLiveDialog] = useState(false)
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null)

  const titleRef = useRef(null)
  const contentRef = useRef(null)

  // useEffect(() => {
  //   gsap.from(titleRef.current, {
  //     y: -50,
  //     opacity: 0,
  //     duration: 1,
  //     ease: "power3.out",
  //   })

  //   gsap.from(contentRef.current, {
  //     y: 50,
  //     opacity: 0,
  //     duration: 1,
  //     delay: 0.5,
  //     ease: "power3.out",
  //   })
  // }, [])

  const updateQuiz = (updates: Partial<Quiz>) => {
    setQuiz((prev) => ({ ...prev, ...updates }))
  }

  const addQuestion = (question: Question) => {
    setQuiz((prev) => ({
      ...prev,
      questions: [...prev.questions, question],
    }))
    setStep(2) // Go back to question type selection after adding a question
  }

  const editQuestion = (questionId: string) => {
    setEditingQuestionId(questionId)
    setStep(3) // Go to AddQuestion step
  }

  const deleteQuestion = (questionId: string) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
    }))
  }

  const reorderQuestions = (newQuestions: Question[]) => {
    setQuiz((prev) => ({
      ...prev,
      questions: newQuestions,
    }))
  }

  const nextStep = () => {
    gsap.to(contentRef.current, {
      opacity: 0,
      x: -100,
      duration: 0.5,
      onComplete: () => {
        setStep((prev) => Math.min(prev + 1, 4))
        gsap.fromTo(contentRef.current, { opacity: 0, x: 100 }, { opacity: 1, x: 0, duration: 0.5 })
      },
    })
  }

  const prevStep = () => {
    gsap.to(contentRef.current, {
      opacity: 0,
      x: 100,
      duration: 0.5,
      onComplete: () => {
        setStep((prev) => Math.max(prev - 1, 1))
        gsap.fromTo(contentRef.current, { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 0.5 })
      },
    })
  }

  const handleSubmitQuiz = () => {
    console.log("Quiz submitted:", quiz)
    setShowSuccess(true)
  }

  const handleMakeLive = (isLive: boolean) => {
    console.log("Quiz set to live:", isLive)
    setShowMakeLiveDialog(false)
    // Here you would typically update the quiz status in your backend
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 py-12 px-4 sm:px-6 lg:px-8 flex">
        <QuestionSidebar
          questions={quiz.questions}
          onEdit={editQuestion}
          onDelete={deleteQuestion}
          onReorder={reorderQuestions}
        />
        <div className="flex-grow max-w-4xl mx-auto">
          <h1 ref={titleRef} className="text-4xl font-bold text-center text-white mb-8">
            Create Your Colorful Quiz
          </h1>
          <StepIndicator currentStep={step} totalSteps={4} />
          <div ref={contentRef} className="bg-white shadow-lg rounded-lg p-6 mt-8">
            {step === 1 && <QuizDetails quiz={quiz} updateQuiz={updateQuiz} />}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Add Questions</h2>
                <Button onClick={() => setStep(3)}>Add New Question</Button>
              </div>
            )}
            {step === 3 && (
              <AddQuestion
                addQuestion={addQuestion}
                questionCount={quiz.questions.length}
                editingQuestion={editingQuestionId ? quiz.questions.find((q) => q.id === editingQuestionId) : undefined}
                onQuestionAdded={() => {
                  setEditingQuestionId(null)
                  setStep(2)
                }}
              />
            )}
            {step === 4 && <ReviewQuiz quiz={quiz} />}
            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <Button onClick={prevStep} variant="secondary">
                  Previous
                </Button>
              )}
              {step < 4 && step !== 3 && (
                <Button onClick={nextStep} className="ml-auto">
                  {step === 2 ? "Review Quiz" : "Add Questions"}
                </Button>
              )}
              {step === 4 && (
                <Button onClick={handleSubmitQuiz} className="ml-auto">
                  Submit Quiz
                </Button>
              )}
            </div>
          </div>
        </div>
        {showSuccess && (
          <SuccessMessage
            message="Your colorful quiz has been successfully created!"
            onClose={() => setShowSuccess(false)}
            onMakeLive={() => setShowMakeLiveDialog(true)}
          />
        )}
        {showMakeLiveDialog && (
          <MakeLiveDialog onConfirm={handleMakeLive} onCancel={() => setShowMakeLiveDialog(false)} />
        )}
      </div>
    </SidebarProvider>
  )
}

