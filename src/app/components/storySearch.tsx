"use client";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command";
import Image from "next/image";

type arrayPart = {
  User: {
    createdAt: string;
    email: string;
    id: string;
    imageUrl: string;
    userName: string;
  };
};

interface Props {
  data: arrayPart[];
}

export default function StorySearch({ data }: Props) {
  const router = useRouter();
  const uniqueUsers: {
    createdAt: string;
    email: string;
    id: string;
    imageUrl: string;
    userName: string;
  }[] = [];
  const userIds = new Set();
  data.forEach((item) => {
    if (!userIds.has(item.User.id)) {
      userIds.add(item.User.id);
      uniqueUsers.push(item.User);
    }
  });

  const onNavigate = (id: string) => {
    router.push(`/Author/${id}`);
  };

  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setOpen(true)}
        className="group px-4 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 transition md:w-auto"
      >
        <Search className="h-5 w-5 text-zinc-500" />
        <p className="font-semibold text-sm text-zinc-500 hover:text-zinc-400">
          Search
        </p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
          <span>ctrl +</span>k
        </kbd>
      </button>

      {/* Command Dialog for Search */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {uniqueUsers.map((item) => {
            if (!data?.length) return null;
            return (
              <CommandGroup key={item.id} heading="Author">
                <CommandItem key={item.id} onSelect={() => onNavigate(item.id)}>
                  <div className="flex cursor-pointer gap-x-4 items-center">
                    <Image
                      className="rounded-full"
                      src={item.imageUrl}
                      width={30}
                      height={30}
                      alt="Author"
                    />
                    <h1 className="pt-1 text-sm text-zinc-700 dark:text-white">
                      {item.userName}
                    </h1>
                  </div>
                </CommandItem>
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
}
