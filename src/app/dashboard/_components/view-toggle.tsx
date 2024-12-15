'use client'

import { useState } from 'react'
import { LayoutGrid, List } from 'lucide-react'
import { Button } from "~/components/ui/button"

interface ViewToggleProps {
  onViewChange: (view: 'grid' | 'list') => void
}

export function ViewToggle({ onViewChange }: ViewToggleProps) {
  const [currentView, setCurrentView] = useState<'grid' | 'list'>('grid')

  const handleViewChange = (view: 'grid' | 'list') => {
    setCurrentView(view)
    onViewChange(view)
  }

  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant={currentView === 'grid' ? "secondary" : "ghost"} 
        size="icon"
        onClick={() => handleViewChange('grid')}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button 
        variant={currentView === 'list' ? "secondary" : "ghost"} 
        size="icon"
        onClick={() => handleViewChange('list')}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  )
}

