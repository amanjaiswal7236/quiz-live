'use client'

import Link from 'next/link'
import { Home, Presentation, Share2, Users, FileText, Plug, GraduationCap, HelpCircle, Trash2, Menu, X } from 'lucide-react'
import Image from 'next/image'

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-full transition-all duration-300 ${isOpen ? 'hidden' : 'block'}`}
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6" />
      </button>
      <div className={`w-64 bg-gray-900 text-white h-screen fixed top-0 left-0 min-h-screen overflow-y-auto z-40 transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <Image src="/logo.svg" width={40} height={40} alt="Logo" />
              <span className="text-xl font-bold">Quiz-Live</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-800 rounded-full transition-colors duration-200"
              aria-label="Close sidebar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                  <Presentation className="w-5 h-5" />
                  <span>My presentations</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                  <Share2 className="w-5 h-5" />
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
                <Users className="w-5 h-5" />
                <span>Workspace presentations</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                <FileText className="w-5 h-5" />
                <span>Shared templates</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="p-4">
          <ul className="space-y-2">
            <li>
              <Link href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                <Plug className="w-5 h-5" />
                <span>Integrations</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                <GraduationCap className="w-5 h-5" />
                <span>Quiz Academy</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                <HelpCircle className="w-5 h-5" />
                <span>Help & support</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                <Trash2 className="w-5 h-5" />
                <span>Trash</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
