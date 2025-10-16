'use client'

import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'raditail'
import { cn } from 'raditail'

export function UsageExamples() {
  const [tab, setTab] = useState('preview')
  return (
    <section className="rounded-[var(--rt-radius-lg)] border border-[--rt-border-color] bg-[--rt-bg] p-6 shadow-sm">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Live Preview</h2>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
        </Tabs>
      </header>
      {tab === 'preview' ? <Preview /> : <CodeSample />}
    </section>
  )
}

function Preview() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">Launch Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a teammate</DialogTitle>
          <DialogDescription>
            Raditail components inherit your Tailwind theme for instant design
            alignment.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium">Email address</label>
          <input
            className={cn(
              'rounded-[var(--rt-radius-md)] border border-[--rt-border-color] px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[--rt-primary-color]/40'
            )}
            placeholder="alex@raditail.dev"
          />
          <Button>Send invite</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function CodeSample() {
  return (
    <pre className="max-h-80 overflow-auto rounded-[var(--rt-radius-md)] bg-[--rt-muted-bg] p-4 text-sm text-[--rt-foreground]">
      <code>
        {`import { Button, Dialog, DialogContent, DialogTrigger } from 'raditail'

function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Launch Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <p>Raditail UI using Radix primitives + Tailwind styling.</p>
      </DialogContent>
    </Dialog>
  )
}`}
      </code>
    </pre>
  )
}
