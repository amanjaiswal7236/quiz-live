import { MoreVertical, Play, Users, Link as LinkIcon, Pencil, FolderUp, Copy, Trash, Folder } from 'lucide-react'
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"

interface Presentation {
    id: string
    title: string
    slides: number
    owner: string
    editedDate: string
    hasResults?: boolean
    folderId?: string
}

interface Folder {
    id: string
    name: string
    items: number
}

interface PresentationListProps {
    folders: Folder[]
    presentations: Presentation[]
    onMovePresentationToFolder: (presentationId: string, folderId: string) => void
}

export function PresentationList({ folders, presentations, onMovePresentationToFolder }: PresentationListProps) {
    const rootPresentations = presentations.filter(p => !p.folderId)

    return (
        <div>
            {folders.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">Folders</h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">
                                    <Checkbox />
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {folders.map((folder) => (
                                <TableRow key={folder.id}>
                                    <TableCell>
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-4">
                                            <Folder className="h-5 w-5 text-muted-foreground" />
                                            <span>{folder.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{folder.items}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="h-4 w-4" />
                                                    <span className="sr-only">Open menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Open</DropdownMenuItem>
                                                <DropdownMenuItem>Rename</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-destructive">
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            <div>
                <h2 className="text-lg font-semibold mb-4">Presentations</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">
                                <Checkbox />
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Owner</TableHead>
                            <TableHead>Edited</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rootPresentations.map((presentation) => (
                            <TableRow key={presentation.id}>
                                <TableCell>
                                    <Checkbox />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Play className="h-4 w-4" />
                                        </Button>
                                        <div>
                                            <div className="font-medium">{presentation.title}</div>
                                            <div className="text-sm text-muted-foreground">{presentation.slides} slides</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{presentation.owner}</TableCell>
                                <TableCell>{presentation.editedDate}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                        {presentation.hasResults && (
                                            <Button variant="outline" size="sm">
                                                View results
                                            </Button>
                                        )}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="h-4 w-4" />
                                                    <span className="sr-only">Open menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-[200px]">
                                                <DropdownMenuItem>
                                                    <Play className="mr-2 h-4 w-4" />
                                                    Present
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Users className="mr-2 h-4 w-4" />
                                                    Present in Teams
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <LinkIcon className="mr-2 h-4 w-4" />
                                                    Open Mentimote
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Users className="mr-2 h-4 w-4" />
                                                    View results
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <LinkIcon className="mr-2 h-4 w-4" />
                                                    Share
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Rename
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <FolderUp className="mr-2 h-4 w-4" />
                                                    Move to...
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Copy className="mr-2 h-4 w-4" />
                                                    Duplicate
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-destructive">
                                                    <Trash className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
