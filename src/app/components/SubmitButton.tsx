"use client"

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
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
interface ki{
  pending:boolean
}

export function SubscriptionButton({pending}:ki){
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

export function SubscriptionButton1({pending}:ki){
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