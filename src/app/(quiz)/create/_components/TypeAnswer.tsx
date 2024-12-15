"use client"

import { useState, useRef, useEffect } from 'react'
import { Zap } from 'lucide-react'
import { gsap } from 'gsap'

export default function TypeAnswer() {
  const [mediaAdded, setMediaAdded] = useState(false)
  const [answers, setAnswers] = useState([''])
  const formRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   if (formRef.current) {
  //     gsap.from(formRef.current.children, {
  //       opacity: 0,
  //       y: 20,
  //       stagger: 0.1,
  //       duration: 0.5,
  //       ease: "power3.out"
  //     })
  //   }
  // }, [])

  const handleAddAnswer = () => {
    setAnswers([...answers, ''])
  }

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  const handleAutocomplete = () => {
    // Implement AI autocomplete logic here
    console.log('Autocomplete with AI')
  }

  return (
    <div className="min-h-screen bg-teal-800 p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-300">QUIZ Title</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Media Section */}
        <div className="bg-purple-700 rounded-lg p-6 flex items-center justify-center min-h-[300px]">
          {mediaAdded ? (
            <div className="text-white text-center">
              <p className="text-2xl mb-4">Media Added</p>
              <button 
                onClick={() => setMediaAdded(false)}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-800 transition-colors"
              >
                Remove Media
              </button>
            </div>
          ) : (
            <div className="text-center">
              <button 
                onClick={() => setMediaAdded(true)}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition-colors text-lg mb-4"
              >
                Add media
              </button>
              <div className="flex items-center justify-center text-white">
                <Zap className="w-5 h-5 mr-2" />
                <span>Generate with AI</span>
              </div>
            </div>
          )}
        </div>

        {/* Form Section */}
        <div ref={formRef} className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="question" className="block text-white text-lg">Question</label>
              <button className="flex items-center text-teal-300 hover:text-teal-100 transition-colors">
                <Zap className="w-4 h-4 mr-1" />
                Generate with AI
              </button>
            </div>
            <textarea 
              id="question"
              className="w-full p-3 rounded-lg bg-teal-700 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows={3}
              placeholder="Required"
            ></textarea>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-white text-lg">Answer</label>
              <button className="flex items-center text-teal-300 hover:text-teal-100 transition-colors">
                <Zap className="w-4 h-4 mr-1" />
                Generate with AI
              </button>
            </div>
            {answers.map((answer, index) => (
              <input 
                key={index}
                type="text"
                value={answer}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="w-full p-2 rounded-lg bg-green-500 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 mb-2"
                placeholder={index === 0 ? "Required" : "Optional"}
              />
            ))}
            <button 
              onClick={handleAddAnswer}
              className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              Add other accepted answer
            </button>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="fun-fact" className="block text-white text-lg">Fun fact</label>
              <button className="flex items-center text-teal-300 hover:text-teal-100 transition-colors">
                <Zap className="w-4 h-4 mr-1" />
                Generate with AI
              </button>
            </div>
            <textarea 
              id="fun-fact"
              className="w-full p-3 rounded-lg bg-teal-700 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows={3}
              placeholder="Optional"
            ></textarea>
          </div>

          <button className="text-teal-300 hover:text-teal-100 transition-colors">
            Add media to fun fact
          </button>

          <button 
            onClick={handleAutocomplete}
            className="w-full bg-yellow-400 text-gray-800 px-4 py-2 rounded hover:bg-yellow-500 transition-colors flex items-center justify-center"
          >
            <Zap className="w-5 h-5 mr-2" />
            Autocomplete with AI
          </button>
        </div>
      </div>
    </div>
  )
}