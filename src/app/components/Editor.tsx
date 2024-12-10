'use client'

import { useState } from 'react'
import { createPost } from "../../app/server";

import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '@/components/ui/textarea';

export const defaultValue = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        
      ]
    }
  ]
}

export default function ContentForm({imageUrl,subName}:{imageUrl:string | null,subName:string}) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState<string>('')
  const [pending, setPending] = useState(false)


  async function handleSubmit() {
    setPending(true)
    const result = await createPost({ title, content ,imageUrl ,subName })
    setPending(false)
  }

  return (
    <div className='mt-6 flex max-w-2xl flex-col gap-4'>
      <div className='flex gap-4'>
        <Input
          type='text'
          placeholder='Title'
          className='p-4 ml-6'
          value={title ?? ""}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
     <Textarea rows={10} className='ml-6' value={content} onChange={(e)=>setContent(e.target.value)}/>
      <Button onClick={handleSubmit} disabled={pending} className='m-6 bg-orange-500 text-white hover:bg-orange-500'>
        {pending ? 'Submitting...' : 'Create'}
      </Button>
    </div>
  )
}