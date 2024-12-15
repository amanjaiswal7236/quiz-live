'use client'

import { Folder, MoreVertical } from 'lucide-react'
import { useDrop } from 'react-dnd'
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"

interface FolderCardProps {
  id: string
  name: string
  itemCount: number
  onOpen: () => void
  onMovePresentationToFolder: (presentationId: string, folderId: string) => void
}

export function FolderCard({ id, name, itemCount, onOpen, onMovePresentationToFolder }: FolderCardProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'PRESENTATION',
    drop: (item: { id: string }) => onMovePresentationToFolder(item.id, id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <Card 
      ref={(node) => {
        if (node) {
          drop(node) // Apply drop method to the node
        }
      }}
      className={`group relative overflow-hidden transition-all duration-200 hover:ring-1 hover:ring-primary/50 ${isOver ? 'ring-2 ring-primary' : ''}`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4" onClick={onOpen}>
            <Folder className="h-8 w-8 text-muted-foreground" />
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm text-muted-foreground">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onOpen}>Open</DropdownMenuItem>
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}
