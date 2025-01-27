"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Pencil, Trash2, GripVertical } from "lucide-react"
import { Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from "~/components/ui/sidebar"
import { Button } from "~/components/ui/button"

type Question = {
    id: string
    text: string
    type: "multiple-choice" | "true-false"
    options: string[]
    correctAnswer: string | string[]
}

type QuestionSidebarProps = {
    questions: Question[]
    onEdit: (id: string) => void
    onDelete: (id: string) => void
    onReorder: (questions: Question[]) => void
}

export default function QuestionSidebar({ questions, onEdit, onDelete, onReorder }: QuestionSidebarProps) {
    // const [expanded, setExpanded] = useState(true)

    const handleDragEnd = (result: any) => {
        if (!result.destination) return

        const items = Array.from(questions)
        const [reorderedItem] = items.splice(result.source.index, 1)
        if (reorderedItem) {
            items.splice(result.destination.index, 0, reorderedItem)
        }
        onReorder(items)
    }

    return (
        <Sidebar>
            <SidebarHeader className="flex justify-between items-center p-4">
                <h2 className="text-lg font-semibold">Questions</h2>
                <SidebarTrigger />
            </SidebarHeader>
            <SidebarContent>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="questions">
                        {(provided) => (
                            <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                                {questions.map((question, index) => (
                                    <Draggable key={question.id} draggableId={question.id} index={index}>
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className="bg-white p-2 rounded-md shadow-sm flex items-center justify-between"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <span {...provided.dragHandleProps}>
                                                        <GripVertical className="text-gray-400" />
                                                    </span>
                                                    <span className="truncate">{question.text}</span>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <Button variant="ghost" size="icon" onClick={() => onEdit(question.id)}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => onDelete(question.id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </SidebarContent>
        </Sidebar>
    )
}

