// @ts-ignore

import { UserAvatar } from "../../components/UserAvatar";
import prisma from "../../lib/db"
import Link from "next/link";

interface props{
    id:string
}

export default async function AllPerson({id}:props) {

    const check = await prisma.authorConverstaion.findMany({
        where: {
            OR: [
                {
                    userIdOne: id
                }, {
                    userIdTwo: id
                }
            ]
        },
        include: {
            UserOne: true,
            UserTwo: true
        }
    })


    const filteredUsers = check
        .flatMap((item) => [item.UserOne, item.UserTwo]) // Combine UserOne and UserTwo into one array
        .filter((user) => user.id !== id); // Exclude the user with the given ID

    return (
        <div className="h-[90vh] overflow-y-scroll bg-black bg-grid-white/[0.2]">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <h1 className="w-full text-center text-muted-foreground top-24 relative text-4xl">Connected People</h1>
            <div className="h-full w-full flex justify-center items-center flex-col">
                {filteredUsers && filteredUsers.map((item,idx:any) => {
                    return <div className="flex-col flex p-3 cursor-pointer" key={idx}>
                      <Link href={`/chat-author/${item.id}`}>
                      <div className="flex gap-x-3 min-w-[300px] items-center justify-around rounded-xl hover:bg-orange-600 duration-200 h-[60px] transition-all">
                            <UserAvatar src={item.imageUrl && item.imageUrl || "GS"} username={item.userName!} />
                            <span className="mt-1">{item.firstName}</span>
                        </div>
                      </Link>
                    </div>
                })}
            </div>
        </div>
    )
}