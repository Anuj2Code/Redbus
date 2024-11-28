
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "../../components/ui/sheet"
import { Menu } from "lucide-react"
import NavigationSide from "./Navigational-sidebar"
import ServerSidebar from "./server-sidebar"


export default function Toggle({ serverId }: { serverId: string }) {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="md:hidden" />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex gap-0">
                <div>
                    <NavigationSide />
                </div>
                <ServerSidebar serverId={serverId} />
            </SheetContent>
        </Sheet>

    )
}