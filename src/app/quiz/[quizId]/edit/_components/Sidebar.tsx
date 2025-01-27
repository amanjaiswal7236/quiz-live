import { AlignJustify, Bot, ImageIcon, MapPin, Menu, Sliders, Square, Type, UserCircle, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'


export default function Sidebar({ onClose }: { onClose: () => void }) {
    return (
      <div className="w-64 bg-gray-900 text-white h-screen overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <Image src="/logo.svg" width={40} height={40} alt="Logo" />
              <span className="text-xl font-bold">Quiz-Live</span>
            </div>
            <button onClick={onClose} className="lg:hidden text-white hover:text-gray-300">
              <X size={24} />
            </button>
          </div>
          <nav>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                  <Menu className="w-5 h-5" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                  <Square className="w-5 h-5" />
                  <span>My presentations</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                  <AlignJustify className="w-5 h-5" />
                  <span>Shared with me</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-700">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">Workspace</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                <UserCircle className="w-5 h-5" />
                <span>Workspace presentations</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                <Type className="w-5 h-5" />
                <span>Shared templates</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="p-4">
          <ul className="space-y-2">
            <li>
              <Link href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                <Sliders className="w-5 h-5" />
                <span>Integrations</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                <Bot className="w-5 h-5" />
                <span>Menti Academy</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                <MapPin className="w-5 h-5" />
                <span>Help & support</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                <ImageIcon className="w-5 h-5" />
                <span>Trash</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }