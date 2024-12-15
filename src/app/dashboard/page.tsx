'use client'

import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Button } from "~/components/ui/button"
import { Plus, FolderPlus } from 'lucide-react'
import Sidebar from '~/components/Sidebar'
import { NewFolderDialog } from './_components/new-folder-dialog'
import { ViewToggle } from './_components/view-toggle'
import { FolderCard } from './_components/folder-card'
import { PresentationCard } from './_components/presentation-card'
import { PresentationList } from './_components/presentation-list'

interface Folder {
  id: string
  name: string
  items: number
}

interface Presentation {
  id: string
  title: string
  slides: number
  owner: string
  editedDate: string
  hasResults: boolean
  images: string[]
  folderId?: string
}

const initialPresentations: Presentation[] = [
  {
    id: '1',
    title: 'Fun class icebreakers',
    slides: 3,
    owner: 'me',
    editedDate: 'Oct 24, 2024',
    hasResults: true,
    images: [
      "https://plus.unsplash.com/premium_photo-1668736594225-55e292fdd95e?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1530462943125-677cc511c87e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cXVpenxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1530462943125-677cc511c87e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cXVpenxlbnwwfHwwfHx8MA%3D%3D"
    ]
  },
  {
    id: '2',
    title: 'My first Quiz',
    slides: 5,
    owner: 'me',
    editedDate: 'Oct 24, 2024',
    hasResults: true,
    images: [
      "https://plus.unsplash.com/premium_photo-1668736594225-55e292fdd95e?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1530462943125-677cc511c87e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cXVpenxlbnwwfHwwfHx8MA%3D%3D"
    ]
  },
  {
    id: '3',
    title: 'New presentation',
    slides: 1,
    owner: 'me',
    editedDate: 'Oct 23, 2024',
    hasResults: false,
    images: [
      "https://plus.unsplash.com/premium_photo-1668736594225-55e292fdd95e?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
]

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState<'grid' | 'list'>('grid')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [folders, setFolders] = useState<Folder[]>([])
  const [presentations, setPresentations] = useState<Presentation[]>(initialPresentations)

  const handleCreateFolder = (name: string) => {
    const newFolder: Folder = {
      id: `folder-${Date.now()}`,
      name,
      items: 0
    }
    setFolders([...folders, newFolder])
  }

  const handleMovePresentationToFolder = (presentationId: string, folderId: string) => {
    setPresentations(presentations.map(presentation => 
      presentation.id === presentationId ? { ...presentation, folderId } : presentation
    ))
    setFolders(folders.map(folder => 
      folder.id === folderId ? { ...folder, items: folder.items + 1 } : folder
    ))
  }

  const rootPresentations = presentations.filter(p => !p.folderId)

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex min-h-screen flex-col">
        <div className="flex-1 items-start md:grid">
          <aside className={`fixed top-14 z-30 -ml-2 w-full shrink-0 overflow-y-auto border-r md:sticky md:block ${isSidebarOpen ? 'block' : 'hidden'}`}>
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          </aside>
          <main className={`flex-1 p-8 transition-all duration-300 ${isSidebarOpen ? 'ml-[260px]' : ''}`}>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight">My presentations</h1>
              <div className="flex items-center space-x-2">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Quiz
                </Button>
                <NewFolderDialog onCreateFolder={handleCreateFolder} />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {folders.length > 0 
                  ? `${folders.length} folders, ${presentations.length} presentations`
                  : `${presentations.length} presentations`}
              </div>
              <ViewToggle onViewChange={setCurrentView} />
            </div>
            <div className="mt-6">
              {currentView === 'grid' ? (
                <>
                  {folders.length > 0 && (
                    <div className="mb-8">
                      <h2 className="text-lg font-semibold mb-4">Folders</h2>
                      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {folders.map((folder) => (
                          <FolderCard
                            key={folder.id}
                            id={folder.id}
                            name={folder.name}
                            itemCount={folder.items}
                            onOpen={() => console.log('Open folder:', folder.name)}
                            onMovePresentationToFolder={handleMovePresentationToFolder}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Presentations</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {rootPresentations.map((presentation) => (
                        <PresentationCard
                          key={presentation.id}
                          id={presentation.id}
                          title={presentation.title}
                          date={presentation.editedDate}
                          author="AJ"
                          images={presentation.images}
                          isSelected={selectedCard === presentation.id}
                          onSelect={() => setSelectedCard(presentation.id)}
                        />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <PresentationList
                  folders={folders}
                  presentations={presentations}
                  onMovePresentationToFolder={handleMovePresentationToFolder}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </DndProvider>
  )
}

