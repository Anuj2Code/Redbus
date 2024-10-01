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
  
  interface props{
    userImage:string | null
    reddit?:string | null 
  }
  
  export function UserDropdown({userImage,reddit}:props){
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
            <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
  
            <img
              src={
                userImage ??
                "https://static.vecteezy.com/system/resources/previews/000/574/512/original/vector-sign-of-user-icon.jpg"
              }
              alt="avatar of user"
              className="rounded-full h-8 w-8 hidden lg:block"
            />
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
    );
  }