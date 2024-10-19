/* eslint-disable @next/next/no-img-element */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface props {
  userImage: string | null
  reddit?: string | null
  username:string
}

export function UserDropdown({ userImage, reddit,username }: props) {
  return (
    <div className="z-50">
      <DropdownMenu >
        <DropdownMenuTrigger>
          <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
            <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
            <Avatar className={cn("h-7 w-7  md:h-10 md:w-10")}>
              <AvatarImage src={userImage as string} alt="@shadcn" />
              <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuItem>
            <Link className="w-full" href="/r/create">
              Create Community
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="w-full" href={`r/${reddit}/create`}>
              Create Post
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="w-full" href="/Post-save">
              My Bookmark
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="w-full" href="/settings">
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogoutLink className="w-full">Logout</LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}