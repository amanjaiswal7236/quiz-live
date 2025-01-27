"use client"

import { useState, useEffect, useRef } from 'react'
import { Zap, GripVertical } from 'lucide-react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'

// Ensure GSAP plugins are registered
gsap.registerPlugin(Draggable)

export default function Reorder() {
  const [mediaAdded, setMediaAdded] = useState(false)
  const [items, setItems] = useState(['', '', '', ''])
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (itemsRef.current) {
      Draggable.create(itemsRef.current.children, {
        type: "y",
        bounds: itemsRef.current,
        onDragEnd: function() {
          const newOrder = Array.from(itemsRef.current!.children).map(
            (child) => (child as HTMLInputElement).value
          )
          setItems(newOrder)
        }
      })
    }
  }, [])

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items]
    newItems[index] = value
    setItems(newItems)
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
              <label className="block text-white text-lg">Items in correct order</label>
              <button className="flex items-center text-teal-300 hover:text-teal-100 transition-colors">
                <Zap className="w-4 h-4 mr-1" />
                Generate with AI
              </button>
            </div>
            <div ref={itemsRef} className="space-y-2">
              {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <GripVertical className="text-teal-300 cursor-move" />
                  <input 
                    type="text"
                    value={item}
                    onChange={(e) => handleItemChange(index, e.target.value)}
                    className="flex-grow p-2 rounded-lg bg-green-500 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder={index < 2 ? "Required" : "Optional"}
                  />
                </div>
              ))}
            </div>
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
        </div>
      </div>
    </div>
  )
}