import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import * as React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table'

describe('Table', () => {
  const renderTable = () =>
    render(
      <Table>
        <TableCaption>Team members</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Ada Lovelace</TableCell>
            <TableCell>Owner</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

  it('renders an accessible table with headers', () => {
    renderTable()

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', { name: 'Name' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('cell', { name: 'Ada Lovelace' })
    ).toBeInTheDocument()
    expect(screen.getByText('Team members')).toBeInTheDocument()
  })

  it('scopes header cells to their column', () => {
    renderTable()
    expect(screen.getByRole('columnheader', { name: 'Role' })).toHaveAttribute(
      'scope',
      'col'
    )
  })

  it('wraps the table so wide content can scroll', () => {
    const { container } = renderTable()
    const wrapper = container.querySelector('div')

    expect(wrapper?.className).toContain('overflow-x-auto')
  })

  it('applies row borders and last-row reset', () => {
    const { container } = renderTable()

    expect(container.querySelector('tbody')?.className).toContain(
      '[&_tr:last-child]:border-0'
    )
    expect(container.querySelector('tr')?.className).toContain(
      'border-b border-[var(--rt-border-color)]'
    )
  })
})
