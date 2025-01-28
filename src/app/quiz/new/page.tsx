"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import {
  ChevronLeft,
  ChevronRight,
  GripVertical,
  Plus,
  Trash2,
  Menu,
  ChevronRightSquare,
  ChevronLeftSquare,
} from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { cn } from "~/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import { Switch } from "~/components/ui/switch"
import { Label } from "~/components/ui/label"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { Progress } from "~/components/ui/progress"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import Sidebar from "~/components/Sidebar"

type Question = {
  id: number
  type: "multiple-choice" | "true-false" | "open-ended"
  text: string
  options: { id: number; text: string }[]
  keywords?: string[]
}

type Step = "quiz-info" | "add-questions" | "review"

type QuizInfoFormData = {
  title: string
  description: string
  category: string
  difficulty: string
  timeLimit: number
  passingScore: number
}

export default function QuizCreator() {
  const [step, setStep] = useState<Step>("quiz-info")
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [makeLive, setMakeLive] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showQuestionsSidebar, setShowQuestionsSidebar] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const form = useForm<QuizInfoFormData>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      difficulty: "medium",
      timeLimit: 30,
      passingScore: 70,
    },
  })

  useEffect(() => {
    const totalSteps = 3
    const currentStep = step === "quiz-info" ? 1 : step === "add-questions" ? 2 : 3
    setProgress((currentStep / totalSteps) * 100)
  }, [step])

  const addNewQuestion = () => {
    const newQuestion: Question = {
      id: questions.length + 1,
      type: "multiple-choice",
      text: "",
      options: [
        { id: 1, text: "Option 1" },
        { id: 2, text: "Option 2" },
      ],
    }
    setQuestions([...questions, newQuestion])
    setCurrentQuestionIndex(questions.length)
    setStep("add-questions")
  }

  const updateQuestion = (index: number, updates: Partial<Question>) => {
    const updatedQuestions = [...questions]
    // updatedQuestions[index] = { ...updatedQuestions[index], ...updates }
    setQuestions(updatedQuestions)
  }

  const deleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index)
    setQuestions(updatedQuestions)
    if (currentQuestionIndex >= updatedQuestions.length) {
      setCurrentQuestionIndex(Math.max(0, updatedQuestions.length - 1))
    }
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString())
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()
    const draggedIndex = Number.parseInt(e.dataTransfer.getData("text/plain"))
    const newQuestions = [...questions]
    const [draggedQuestion] = newQuestions.splice(draggedIndex, 1)
    if (draggedQuestion) {
      newQuestions.splice(targetIndex, 0, draggedQuestion)
    }
    setQuestions(newQuestions)
  }

  const renderQuizInfo = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Create Your Quiz</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quiz Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter an engaging title for your quiz..." {...field} />
                </FormControl>
                <FormDescription>Choose a catchy title that describes your quiz content.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quiz Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide a brief description of your quiz..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Explain what participants can expect from this quiz.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="general">General Knowledge</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Choose a category that best fits your quiz.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Set the overall difficulty of your quiz.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timeLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time Limit (minutes)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={(e) => field.onChange(+e.target.value)} />
                </FormControl>
                <FormDescription>Set a time limit for completing the quiz (in minutes).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passingScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passing Score (%)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={(e) => field.onChange(+e.target.value)} />
                </FormControl>
                <FormDescription>Set the minimum score required to pass the quiz (as a percentage).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </motion.div>
  )

  const renderQuestionOptions = () => {
    const currentQuestion = questions[currentQuestionIndex]
    if (!currentQuestion) return null

    switch (currentQuestion.type) {
      case "multiple-choice":
        return (
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-2"
              >
                <Input
                  value={option.text}
                  onChange={(e) => {
                    const newOptions = [...currentQuestion.options]
                    if (newOptions[index]) {
                      newOptions[index].text = e.target.value
                    }
                    updateQuestion(currentQuestionIndex, { options: newOptions })
                  }}
                  placeholder={`Option ${index + 1}`}
                  className="flex-grow"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const newOptions = currentQuestion.options.filter((_, i) => i !== index)
                    updateQuestion(currentQuestionIndex, { options: newOptions })
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
            <Button
              onClick={() => {
                const newOptions = [...currentQuestion.options, { id: Date.now(), text: "" }]
                updateQuestion(currentQuestionIndex, { options: newOptions })
              }}
            >
              Add Option
            </Button>
          </div>
        )
      case "true-false":
        return (
          <RadioGroup
            value={currentQuestion.options[0]?.text}
            onValueChange={(value) => {
              updateQuestion(currentQuestionIndex, {
                options: [{ id: 1, text: value }],
              })
            }}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="true" />
              <Label htmlFor="true">True</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="false" />
              <Label htmlFor="false">False</Label>
            </div>
          </RadioGroup>
        )
      case "open-ended":
        return (
          <div className="space-y-4">
            <Textarea
              placeholder="Participants will enter their answer here..."
              className="min-h-[100px] border-2 focus-visible:ring-purple-500"
              disabled
            />
            <div>
              <Label htmlFor="keywords">Keywords (comma-separated)</Label>
              <Input
                id="keywords"
                value={currentQuestion.keywords?.join(", ") || ""}
                onChange={(e) => {
                  const keywords = e.target.value
                    .split(",")
                    .map((k) => k.trim())
                    .filter(Boolean)
                  updateQuestion(currentQuestionIndex, { keywords })
                }}
                placeholder="Enter keywords to check correctness"
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const renderAddQuestions = () => {
    if (questions.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="text-center py-10"
        >
          <p className="text-gray-500 mb-4">No questions added yet.</p>
          <Button onClick={addNewQuestion}>Add Your First Question</Button>
        </motion.div>
      )
    }

    const currentQuestion = questions[currentQuestionIndex]
    if (!currentQuestion) return null

    return (
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Question {currentQuestionIndex + 1}</h2>
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
        <Select
          value={currentQuestion.type}
          onValueChange={(value: "multiple-choice" | "true-false" | "open-ended") =>
            updateQuestion(currentQuestionIndex, { type: value })
          }
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Question Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
            <SelectItem value="true-false">True/False</SelectItem>
            <SelectItem value="open-ended">Open Ended</SelectItem>
          </SelectContent>
        </Select>
        <Input
          value={currentQuestion.text}
          onChange={(e) => updateQuestion(currentQuestionIndex, { text: e.target.value })}
          placeholder="Ask your question here..."
          className="text-xl p-4 border-2 focus-visible:ring-purple-500"
        />
        {renderQuestionOptions()}
      </motion.div>
    )
  }

  const renderReview = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Review Your Quiz</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Quiz Information</h3>
        <p className="text-gray-600 mb-2">
          <strong>Title:</strong> {form.getValues("title")}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Description:</strong> {form.getValues("description")}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Category:</strong> {form.getValues("category")}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Difficulty:</strong> {form.getValues("difficulty")}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Time Limit:</strong> {form.getValues("timeLimit")} minutes
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Passing Score:</strong> {form.getValues("passingScore")}%
        </p>
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-gray-800">Questions</h3>
        {questions.length === 0 ? (
          <p className="text-gray-500">No questions added to this quiz.</p>
        ) : (
          questions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white shadow-md rounded-lg p-6"
            >
              <h4 className="font-bold text-lg text-gray-800 mb-2">Question {index + 1}</h4>
              <p className="text-gray-600 mb-2">{question.text}</p>
              <p className="text-sm text-gray-500 mb-2">Type: {question.type}</p>
              {question.type === "multiple-choice" && (
                <ul className="list-disc list-inside">
                  {question.options.map((option, optionIndex) => (
                    <li key={option.id} className="text-gray-600">
                      {option.text}
                    </li>
                  ))}
                </ul>
              )}
              {question.type === "true-false" && <p className="text-gray-600">Answer: {question.options[0]?.text}</p>}
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  )

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300 ease-in-out",
          isSidebarOpen ? "ml-64" : "ml-0",
          showQuestionsSidebar ? "mr-64" : "mr-0",
        )}
      >
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="text-sm text-gray-600">
              Join at menti.com | use code <span className="font-mono">3813 5955</span>
            </div>
          </div>
          <div className="text-purple-600 font-semibold">Mentimeter</div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white px-4 py-2">
          <Progress value={progress} className="w-full" />
        </div>

        <div className="flex-1 flex overflow-hidden justify-center">
          {/* Main Content */}
          <div className="flex-1 p-8 overflow-y-auto max-w-4xl w-full">
            <AnimatePresence mode="wait">
              {step === "quiz-info" && renderQuizInfo()}
              {step === "add-questions" && renderAddQuestions()}
              {step === "review" && renderReview()}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white border-t border-gray-200 p-4 flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (step === "add-questions") setStep("quiz-info")
              if (step === "review") setStep("add-questions")
            }}
            disabled={step === "quiz-info"}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              if (step === "quiz-info") {
                if (form.formState.isValid) {
                  setStep("add-questions")
                } else {
                  form.trigger()
                }
              }
              if (step === "add-questions") setStep("review")
              if (step === "review") setShowSuccessDialog(true)
            }}
          >
            {step === "review" ? "Submit Quiz" : "Next"}
          </Button>
        </div>
      </div>

      {/* Questions Sidebar Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowQuestionsSidebar(!showQuestionsSidebar)}
        className="fixed top-1/2 right-0 transform -translate-y-1/2 z-10"
        aria-label={showQuestionsSidebar ? "Hide questions" : "Show questions"}
      >
        {showQuestionsSidebar ? <ChevronRightSquare className="h-6 w-6" /> : <ChevronLeftSquare className="h-6 w-6" />}
      </Button>

      {/* Questions Sidebar */}
      <div
        className={cn(
          "bg-white border-l border-gray-200 p-4 overflow-y-auto fixed top-0 right-0 h-full",
          "transition-all duration-300 ease-in-out",
          showQuestionsSidebar ? "w-64 translate-x-0" : "w-64 translate-x-full",
        )}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Questions</h3>
        </div>
        <Button variant="default" className="w-full mb-4" onClick={addNewQuestion}>
          <Plus className="h-4 w-4 mr-2" /> New question
        </Button>
        <div className="space-y-2">
          {questions.map((question, index) => (
            <motion.div
              key={question.id}
              draggable
              onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className={cn(
                "group w-full rounded-lg p-2 text-left transition-colors",
                "hover:bg-gray-100 cursor-move",
                currentQuestionIndex === index && step === "add-questions" && "ring-2 ring-purple-500 ring-offset-2",
              )}
              onClick={() => {
                setCurrentQuestionIndex(index)
                setStep("add-questions")
              }}
            >
              <div className="flex items-center gap-2">
                <GripVertical className="h-5 w-5 text-gray-400" />
                <span className="truncate text-sm">{question.text || `Question ${index + 1}`}</span>
                <button
                  className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteQuestion(index)
                  }}
                >
                  <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quiz Created Successfully!</DialogTitle>
            <DialogDescription>Your quiz has been created. Would you like to make it live now?</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <Switch id="make-live" checked={makeLive} onCheckedChange={setMakeLive} />
            <Label htmlFor="make-live">Make quiz live</Label>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                console.log("Quiz submitted:", { ...form.getValues(), questions, makeLive })
                setShowSuccessDialog(false)
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

