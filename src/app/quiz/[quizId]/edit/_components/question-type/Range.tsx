"use client"

import { useState, useRef, useEffect } from 'react'
import { Zap, Check } from 'lucide-react'
import { gsap } from 'gsap'

export default function Range() {
  const [mediaAdded, setMediaAdded] = useState(false)
  const [correctValue, setCorrectValue] = useState('15')
  const [unit, setUnit] = useState('')
  const [minValue, setMinValue] = useState('0')
  const [maxValue, setMaxValue] = useState('50')
  const [requireExact, setRequireExact] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   if (sliderRef.current) {
  //     gsap.to(sliderRef.current, {
  //       width: `${(parseInt(correctValue) / parseInt(maxValue)) * 100}%`,
  //       duration: 0.5,
  //       ease: "power2.out"
  //     })
  //   }
  // }, [correctValue, maxValue])

  const handleAddUnit = () => {
    const newUnit = prompt("Enter unit:")
    if (newUnit) setUnit(newUnit)
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
        <div className="space-y-6">
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
              <label htmlFor="correct-value" className="block text-white text-lg">Correct value</label>
              <button className="flex items-center text-teal-300 hover:text-teal-100 transition-colors">
                <Zap className="w-4 h-4 mr-1" />
                Generate with AI
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="text"
                id="correct-value"
                value={correctValue}
                onChange={(e) => setCorrectValue(e.target.value)}
                className="flex-grow p-2 rounded-lg bg-green-500 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Required"
              />
              <button 
                onClick={handleAddUnit}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
              >
                Add unit
              </button>
            </div>
            {unit && <p className="text-white mt-1">Unit: {unit}</p>}
          </div>

          <div>
            <h3 className="text-white text-lg mb-2">Range</h3>
            <div className="flex justify-between mb-2">
              <div>
                <label htmlFor="min-value" className="block text-white text-sm">Min. value:</label>
                <input 
                  type="text"
                  id="min-value"
                  value={minValue}
                  onChange={(e) => setMinValue(e.target.value)}
                  className="w-24 p-2 rounded-lg bg-teal-700 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label htmlFor="max-value" className="block text-white text-sm">Max. value:</label>
                <input 
                  type="text"
                  id="max-value"
                  value={maxValue}
                  onChange={(e) => setMaxValue(e.target.value)}
                  className="w-24 p-2 rounded-lg bg-teal-700 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            <div className="relative h-8 bg-teal-600 rounded-full">
              <div 
                ref={sliderRef}
                className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
              ></div>
              <div 
                className="absolute top-0 left-0 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center"
                style={{ left: `calc(${(parseInt(correctValue) / parseInt(maxValue)) * 100}% - 1rem)` }}
              >
                <Check className="w-4 h-4 text-green-500" />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input 
              type="checkbox"
              id="require-exact"
              checked={requireExact}
              onChange={(e) => setRequireExact(e.target.checked)}
              className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label htmlFor="require-exact" className="text-white">
              Require exact answer for points
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}