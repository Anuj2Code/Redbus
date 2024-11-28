import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "../../components/ui/avatar"
import { cn } from "../../lib/utils"

interface propsAvatar {
  src?:string 
  className?:string
  username:string
}

export const UserAvatar = ({src,className,username}:propsAvatar)=>{
  return (
    <Avatar className={cn("h-7 w-7  md:h-10 md:w-10",className)}>
      <AvatarImage src={src} alt="@shadcn" />
      <AvatarFallback>{username && username.substring(0,2).toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}