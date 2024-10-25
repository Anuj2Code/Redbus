import { channel, server } from "@prisma/client";
import {create} from "zustand";

export type ModalType = "createServer" | "invite" | "members" | "channel" | "leaveServer" | "deleteServer" | "deleteChannel";

interface ModelData {
    server?:server
    channel?:channel
}

interface ModalStore {
    type:ModalType | null;
    isOpen:boolean;
    data:ModelData;
    onOpen:(type:ModalType,data?:ModelData)=> void;
    onClose:()=>void;
}

export const useModal = create<ModalStore>((set)=>({
    type:null,
    isOpen:false,
    data:{},
    onOpen:(type,data?:{})=> set({isOpen:true,type,data}),
    onClose:()=>set({type:null,isOpen:false})
}))
