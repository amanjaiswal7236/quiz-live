"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { UserCircle, Menu, Square, CheckSquare, AlignJustify, Sliders, MapPin, ImageIcon, Type, Bot, X, Zap, ArrowLeft } from 'lucide-react'
import { gsap } from 'gsap'
import Sidebar from './_components/Sidebar'
import Buttons from './_components/question-type/Buttons'
import { UserButton } from '@clerk/nextjs'
import Reorder from './_components/question-type/Reorder'
import Range from './_components/question-type/Range'
import Pinpoint from './_components/question-type/Pinpoint'
import TypeAnswer from './_components/question-type/TypeAnswer'
import Checkboxes from './_components/question-type/Checkboxes'
import { useForm, FormProvider } from 'react-hook-form'

export default function QuizCreator({params}: {params: {quizId: string}}) {
  const [quiz, setQuiz] = useState<any>(null)
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const router = useRouter()
  const searchParams = useSearchParams()
  const questionId = searchParams.get('question')
  
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const questionTypesRef = useRef(null)

  const methods = useForm()

  const questionTypes = [
    { name: 'Buttons', icon: Square, description: 'One correct answer', color: 'bg-blue-500', hoverColor: 'hover:bg-blue-600' },
    { name: 'Checkboxes', icon: CheckSquare, description: 'Multiple correct answers', color: 'bg-green-500', hoverColor: 'hover:bg-green-600' },
    { name: 'Reorder', icon: AlignJustify, description: 'Place answers in the correct order', color: 'bg-yellow-500', hoverColor: 'hover:bg-yellow-600' },
    { name: 'Range', icon: Sliders, description: 'Guess the answer on a scale', color: 'bg-purple-500', hoverColor: 'hover:bg-purple-600' },
    { name: 'Location', icon: MapPin, description: 'Pin the answer on a map', color: 'bg-red-500', hoverColor: 'hover:bg-red-600' },
    { name: 'Pinpoint', icon: ImageIcon, description: 'Pin the answer on an image', color: 'bg-pink-500', hoverColor: 'hover:bg-pink-600', new: true },
    { name: 'Type answer', icon: Type, description: 'Free text answer', color: 'bg-indigo-500', hoverColor: 'hover:bg-indigo-600' },
    { name: 'AI assisted', icon: Bot, description: 'Generate questions with AI', color: 'bg-cyan-500', hoverColor: 'hover:bg-cyan-600' },
  ]

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const handleTypeClick = (type: string) => {
    setSelectedType(type);
    methods.reset();
  };

  const handleBack = () => {
    setSelectedType(null);
    methods.reset();
  };

  const onSubmit = (data: any) => {
    console.log(data); // Handle form submission
    // You can add your logic here to save the quiz question
  };

  const renderSelectedComponent = () => {
    switch (selectedType) {
      case 'Buttons':
        return <Buttons />;
      case 'Checkboxes':
        return <Checkboxes />;
      case 'Reorder':
        return <Reorder />;
      case 'Range':
        return <Range />;
      case 'Pinpoint':
        return <Pinpoint />;
      case 'Type answer':
        return <TypeAnswer />;
      default:
        return <div className="text-white">Component not implemented yet</div>;
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold">Create Quiz</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors">
                Done
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors">
                Preview
              </button>
              <div className="relative group mt-3">
                <UserButton />
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <h2 className='text-3xl font-bold text-black mb-8'>
              Select a question type
            </h2>
          </div>
          <div className="max-w-7xl mx-auto">
            {!selectedType ? (
              <>
                <h2 className="text-3xl font-bold text-black mb-8">Add Slide</h2>
                <div ref={questionTypesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {questionTypes.map((type, index) => (
                    <div 
                      key={index} 
                      className={`${type.color} p-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 ${type.hoverColor} cursor-pointer`}
                      onClick={() => handleTypeClick(type.name)}
                    >
                      <div className="flex items-center mb-4">
                        <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                          <type.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">{type.name}</h3>
                        {type.new && (
                          <span className="ml-2 bg-yellow-400 text-gray-800 text-xs font-bold px-2 py-1 rounded">NEW!</span>
                        )}
                      </div>
                      <p className="text-white text-opacity-90">{type.description}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-teal-700 p-6 rounded-lg shadow-md">
                <button 
                  onClick={handleBack} 
                  className="mb-4 p-2 text-white hover:bg-teal-600 rounded-full transition-colors"
                  aria-label="Back to selection"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-white">Selected: {selectedType}</h2>
                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(onSubmit)}>
                    {renderSelectedComponent()}
                    <button 
                      type="submit" 
                      className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors"
                    >
                      Save Question
                    </button>
                  </form>
                </FormProvider>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

