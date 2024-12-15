"use client"

import { useState, useRef, useEffect } from 'react'
import { Trash2, ZoomIn, ZoomOut, Play, Pencil, Zap } from 'lucide-react'
import { gsap } from 'gsap'

export default function Pinpoint() {
  const [image, setImage] = useState<string | null>(null)
  const [pinpointCoords, setPinpointCoords] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [revealEffect, setRevealEffect] = useState('No reveal-effect')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (image) {
      const img = new Image()
      img.src = image
      img.onload = () => {
        if (canvasRef.current && imageRef.current) {
          const canvas = canvasRef.current
          const ctx = canvas.getContext('2d')
          canvas.width = imageRef.current.width
          canvas.height = imageRef.current.height
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
          ctx?.save()
          ctx!.globalAlpha = 0.5
          ctx?.fillRect(0, 0, canvas.width, canvas.height)
          ctx?.restore()
          ctx?.clearRect(pinpointCoords.x, pinpointCoords.y, pinpointCoords.width, pinpointCoords.height)
        }
      }
    }
  }, [image, pinpointCoords])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handlePinpoint = (e: React.MouseEvent<HTMLImageElement>) => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setPinpointCoords({ x, y, width: 100, height: 100 })
    }
  }

  const handleDeleteImage = () => setImage(null)

  const handleZoomIn = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, { scale: '+=0.1', duration: 0.3 })
    }
  }

  const handleZoomOut = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, { scale: '-=0.1', duration: 0.3 })
    }
  }

  return (
    <div className="min-h-screen bg-teal-800 p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-300">QUIZ Title</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Section */}
        <div className="bg-purple-700 rounded-lg p-6">
          <div className="flex justify-between mb-4">
            <div className="flex space-x-2">
              <button onClick={handleDeleteImage} className="p-2 bg-purple-600 rounded-lg text-white hover:bg-purple-800 transition-colors">
                <Trash2 size={20} />
              </button>
              <button onClick={handleZoomIn} className="p-2 bg-purple-600 rounded-lg text-white hover:bg-purple-800 transition-colors">
                <ZoomIn size={20} />
              </button>
              <button onClick={handleZoomOut} className="p-2 bg-purple-600 rounded-lg text-white hover:bg-purple-800 transition-colors">
                <ZoomOut size={20} />
              </button>
            </div>
            <button className="px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-800 transition-colors">
              Replace
            </button>
          </div>
          <div className="relative aspect-video bg-purple-800 rounded-lg overflow-hidden">
            {image ? (
              <img
                ref={imageRef}
                src={image}
                alt="Uploaded image"
                className="w-full h-full object-contain"
                onClick={handlePinpoint}
              />
            ) : (
              <label className="flex items-center justify-center w-full h-full cursor-pointer">
                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                <span className="text-white">Click to upload image</span>
              </label>
            )}
          </div>
          <div className="flex justify-between items-center mt-4">
            <select
              value={revealEffect}
              onChange={(e) => setRevealEffect(e.target.value)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              <option>No reveal-effect</option>
              <option>Fade in</option>
              <option>Slide in</option>
            </select>
            <button className="p-2 bg-purple-600 rounded-lg text-white hover:bg-purple-800 transition-colors">
              <Play size={20} />
            </button>
          </div>
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
            <h3 className="text-white text-lg mb-2">Correct answer</h3>
            <div className="relative aspect-video bg-gray-300 rounded-lg overflow-hidden">
              <canvas ref={canvasRef} className="w-full h-full" />
              <div className="absolute bottom-4 right-4 space-x-2">
                <button className="p-2 bg-green-500 rounded-full text-white hover:bg-green-600 transition-colors">
                  <Pencil size={20} />
                </button>
                <button className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors">
                  <Trash2 size={20} />
                </button>
                <button className="px-4 py-2 bg-teal-500 rounded-lg text-white hover:bg-teal-600 transition-colors">
                  Clear all
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}