"use client"

import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button type="submit" className='bg-orange-500 hover:bg-orange-500 text-white'>{text}</Button>
      )}
    </>
  );
}

export function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button className="mt-2 w-full" disabled size="sm">
          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button size="lg" className="mt-4 w-full bg-orange-500 hover:bg-orange-500 text-white" type="submit">
          Save
        </Button>
      )}
    </>
  );
}

interface ki {
  pending: boolean
}

export function SubscriptionButton({ pending }: ki) {
  return (
    <>
      {pending ? (
        <Button className=" w-full" disabled size="sm">
          <Loader2 className=" mr-2 h-12 w-3 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button size="lg" className=" w-full bg-orange-500 hover:bg-orange-600 text-white h-9 text-center " type="submit">
          Join Community
        </Button>
      )}
    </>
  );
}

export function SubscriptionButton1({ pending }: ki) {
  return (
    <>
      {pending ? (
        <Button className=" w-full" disabled size="sm">
          <Loader2 className=" mr-2 h-12 w-3 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button size="lg" className=" w-full bg-orange-500 hover:bg-orange-600 text-white h-9 text-center " type="submit">
          Leave Community
        </Button>
      )}
    </>
  );
}

export function UpVote() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button variant="outline" size="icon" disabled>
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button variant="outline" size="sm" type="submit">
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </>
  );
}
export function DownVote() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button variant="outline" size="icon" disabled>
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button variant="outline" size="sm" type="submit">
          <ArrowDown className="h-4 w-4" />
        </Button>
      )}
    </>
  );
}

export function Comment_btn({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button type="submit" className='bg-blue-500 text-white hover:bg-blue-500 w-[100px]'>{text}</Button>
      )}
    </>
  );
}

export function CommentArticle() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button type="submit" className="bg-[#2aa06b] hover:bg-[#3ecf8e] text-white transition-all duration-150">Send message</Button>
      )}
    </>
  );
}