import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"

interface TutorialDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  duration: string
}

export function TutorialDialog({ isOpen, onClose, title, duration }: TutorialDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{duration}</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <p>This is where the tutorial content would go.</p>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

