"use client"

import { useState, useRef, useEffect } from 'react'
import { Copy, Trash2, Plus } from 'lucide-react'
import { gsap } from 'gsap'
import { useFormContext } from 'react-hook-form'

interface Slide {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: number;
}

export default function Buttons() {
  const { register, watch, setValue } = useFormContext()
  const [mediaAdded, setMediaAdded] = useState(false)
  const [slides, setSlides] = useState<Slide[]>([
    { id: 1, question: '', answers: ['', '', '', ''], correctAnswer: 0 }
  ])
  const [currentSlide, setCurrentSlide] = useState(0)
  const formRef = useRef<HTMLDivElement>(null)
  const slidesPreviewRef = useRef<HTMLDivElement>(null)

  const watchedSlides = watch('slides')

  useEffect(() => {
    if (watchedSlides) {
      setSlides(watchedSlides)
    }
  }, [watchedSlides])

  const handleQuestionChange = (value: string) => {
    const updatedSlides = [...slides]
    if (updatedSlides[currentSlide]) {
      updatedSlides[currentSlide].question = value
    }
    setValue('slides', updatedSlides)
  }

  const handleAnswerChange = (index: number, value: string) => {
    const updatedSlides = [...slides]
    if (updatedSlides[currentSlide]) {
      updatedSlides[currentSlide].answers[index] = value
    }
    setValue('slides', updatedSlides)
  }
  
  const handleCorrectAnswerChange = (index: number) => {
    const updatedSlides = [...slides]
    if (updatedSlides[currentSlide]) {
      updatedSlides[currentSlide].correctAnswer = index
    }
    setValue('slides', updatedSlides)
  }

  const handleDuplicateSlide = () => {
    const newSlide: Slide = { 
      ...slides[currentSlide], 
      id: Date.now(), 
      question: slides[currentSlide]?.question ?? '', 
      answers: slides[currentSlide]?.answers ?? ['', '', '', ''], 
      correctAnswer: slides[currentSlide]?.correctAnswer ?? 0 
    }
    const updatedSlides = [...slides, newSlide]
    setValue('slides', updatedSlides)
    setCurrentSlide(updatedSlides.length - 1)
  }

  const handleDeleteSlide = () => {
    if (slides.length > 1) {
      const updatedSlides = slides.filter((_, index) => index !== currentSlide)
      setValue('slides', updatedSlides)
      setCurrentSlide(Math.min(currentSlide, updatedSlides.length - 1))
    }
  }

  const handleNewSlide = () => {
    const newSlide = { id: Date.now(), question: '', answers: ['', '', '', ''], correctAnswer: 0 }
    const updatedSlides = [...slides, newSlide]
    setValue('slides', updatedSlides)
    setCurrentSlide(updatedSlides.length - 1)
  }

  return (
    <div className="min-h-screen bg-teal-800 p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-300">Quiz title</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Media Section */}
        <div className="bg-purple-700 rounded-lg p-6">
          <div className="flex justify-between mb-4">
            <div className="flex space-x-2">
              <button onClick={handleDuplicateSlide} className="p-2 bg-purple-600 rounded-lg text-white hover:bg-purple-800 transition-colors">
                <Copy size={20} />
              </button>
              <button onClick={handleDeleteSlide} className="p-2 bg-purple-600 rounded-lg text-white hover:bg-purple-800 transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
            <button className="px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-800 transition-colors">
              Replace
            </button>
          </div>
          <div className="aspect-video bg-purple-800 rounded-lg flex items-center justify-center">
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
              </div>
            )}
          </div>
        </div>

        {/* Form Section */}
        <div ref={formRef} className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="question" className="block text-white text-lg">Question</label>
            </div>
            <textarea 
              id="question"
              {...register(`slides.${currentSlide}.question`)}
              onChange={(e) => handleQuestionChange(e.target.value)}
              className="w-full p-3 rounded-lg bg-teal-700 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows={3}
              placeholder="Required"
            ></textarea>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-white text-lg">Answers</label>
            </div>
            {slides[currentSlide]?.answers.map((answer, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <button 
                  onClick={() => handleCorrectAnswerChange(index)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    slides[currentSlide]?.correctAnswer === index ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {slides[currentSlide] && slides[currentSlide].correctAnswer === index ? '✓' : '✗'}
                </button>
                <input 
                  type="text"
                  {...register(`slides.${currentSlide}.answers.${index}`)}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  className="flex-grow p-2 rounded-lg bg-teal-700 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder={index === 0 ? "Required" : "Optional"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slides Preview */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">Slides</h2>
        <div ref={slidesPreviewRef} className="flex space-x-4 overflow-x-auto pb-4">
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`flex-shrink-0 w-32 h-24 rounded-lg p-2 cursor-pointer ${
                index === currentSlide ? 'bg-teal-600' : 'bg-teal-700'
              }`}
            >
              <p className="text-white text-sm truncate">{slide.question ?? 'New Slide'}</p>
            </div>
          ))}
        </div>
        <button 
          onClick={handleNewSlide}
          className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add new slide
        </button>
      </div>
    </div>
  )
}

