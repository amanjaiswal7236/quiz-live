import { Square, CheckSquare, AlignJustify, Sliders, MapPin, ImageIcon, Type, Bot } from 'lucide-react'
import { Card, CardContent } from '~/components/ui/card'

type QuestionTypeProps = {
  onSelect: (type: string) => void
}

export default function QuestionType({ onSelect }: QuestionTypeProps) {
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

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Question Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {questionTypes.map((type) => (
          <Card
            key={type.name}
            className={`${type.color} cursor-pointer transition-all duration-300 transform hover:scale-105 ${type.hoverColor}`}
            onClick={() => onSelect(type.name)}
          >
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                  <type.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    {type.name}
                    {type.new && (
                      <span className="bg-yellow-400 text-gray-800 text-xs font-bold px-2 py-1 rounded">
                        NEW!
                      </span>
                    )}
                  </h3>
                </div>
              </div>
              <p className="text-white text-opacity-90">{type.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

