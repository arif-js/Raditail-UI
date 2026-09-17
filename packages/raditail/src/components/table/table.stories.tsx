import type { Meta, StoryObj } from '@storybook/react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table'
import { Badge } from '../badge/badge'

const meta: Meta<typeof Table> = {
  tags: ['autodocs'],
  title: 'Components/Table',
  component: Table,
}

export default meta

type Story = StoryObj<typeof Table>

const rows = [
  { name: 'Ada Lovelace', role: 'Owner', status: 'active' as const },
  { name: 'Grace Hopper', role: 'Admin', status: 'active' as const },
  { name: 'Alan Turing', role: 'Viewer', status: 'pending' as const },
]

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Team members with access to this project.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.name}>
            <TableCell className="font-medium">{row.name}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell>
              <Badge
                colorScheme={row.status === 'active' ? 'success' : 'warning'}
              >
                {row.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}
