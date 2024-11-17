import { User } from "@prisma/client";
import Image from "next/image";

interface props{
    user:User
    publish:string
}


export default function BlogCard({user,publish}:props) {
   
    return (
        <div className='flex gap-x-3'>
        <Image className='rounded-full' src={user.imageUrl as string} height={90} width={90} alt='img' />
        <div className='mt-6'>
            <div className='flex gap-x-3'>
                <span>{user.userName}</span>
                <button className='text-rose-500'>Follow</button>
            </div>
            <p>Published on <span className="text-sm text-muted-foreground">{new Date(publish).toLocaleDateString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
            })}</span></p>
        </div>
    </div>
    )
}  