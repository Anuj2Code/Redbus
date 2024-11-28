import { Separator } from "../../../components/ui/separator";
import { Award } from "lucide-react";
import { UserAvatar } from "../UserAvatar";

export default function AuthorTop({ userName, imageUrl }: { userName: string | null, imageUrl: string | null | undefined }) {
    return (
        <div className="h-[10vh] bg-black flex gap-x-12 flex-col gap-y-4">
            <div className="font-semibold flex text-md text-white pt-6 w-full justify-center">
                <UserAvatar username={userName!} src={imageUrl!} />
                <span className="text-xl ml-2 mt-2">{userName}</span>
                <Award className="text-green-400 h-6 w-6 font-medium mt-1 pl-2" />
            </div>
            <Separator />
        </div>
    )
}