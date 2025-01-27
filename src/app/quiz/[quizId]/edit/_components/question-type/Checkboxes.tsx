"use client"

import { useState } from 'react'
import { Zap, X, Check } from 'lucide-react'

export default function Checkboxes() {
  const [mediaAdded, setMediaAdded] = useState(false)

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
              <label className="block text-white text-lg">Select the correct answer(s)</label>
              <button className="flex items-center text-teal-300 hover:text-teal-100 transition-colors">
                <Zap className="w-4 h-4 mr-1" />
                Generate with AI
              </button>
            </div>
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <button className={`w-8 h-8 rounded-lg flex items-center justify-center ${index === 1 ? 'bg-green-500' : 'bg-red-500'}`}>
                  {index === 1 ? <Check className="w-5 h-5 text-white" /> : <X className="w-5 h-5 text-white" />}
                </button>
                <input 
                  type="text"
                  className="flex-grow p-2 rounded-lg bg-teal-700 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder={index === 1 ? "Required" : "Optional"}
                />
              </div>
            ))}
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
        </div>
      </div>
    </div>
  )
}