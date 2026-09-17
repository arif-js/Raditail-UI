import * as React from 'react'
import { createRoot } from 'react-dom/client'

// Both documented stylesheet entry points must resolve from the tarball.
import 'raditail/theme/tailwind.css'
import 'raditail/theme/styles.css'

// Subpath entry points - no barrel involved. Must resolve, type-check and build
// independently of the rest of the library.
import { Button as SubpathButton } from 'raditail/button'
import { Badge } from 'raditail/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'raditail/table'

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  Textarea,
  Toaster,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useToast,
} from 'raditail'

function App() {
  const { toast } = useToast()

  return (
    <TooltipProvider>
      <Button variant="solid" colorScheme="primary" size="md">
        Primary
      </Button>
      <SubpathButton variant="subtle">From subpath</SubpathButton>
      <Badge variant="outline" colorScheme="success">
        Active
      </Badge>
      <Card className="w-64">
        <CardHeader>
          <CardTitle>Deployments</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-24" />
          <Textarea placeholder="Notes" />
        </CardContent>
      </Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Ada</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button onClick={() => toast({ title: 'Saved' })}>Notify</Button>
      <Button variant="outline" colorScheme="destructive" isLoading>
        Deleting
      </Button>
      <Input placeholder="Email" />
      <Checkbox label="Accept terms" aria-label="Accept terms" />
      <Select defaultValue="one">
        <SelectTrigger>
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="one">One</SelectItem>
          <SelectItem value="two">Two</SelectItem>
        </SelectContent>
      </Select>
      <DropdownMenu
        trigger={<Button variant="ghost">Menu</Button>}
        menuItems={[
          { label: 'Profile' },
          { type: 'separator' },
          { label: 'Sign out' },
        ]}
      />
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogContent>
      </Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="subtle">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>Tooltip body</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <Toaster>
    <App />
  </Toaster>
)
