import { channel, server } from "@prisma/client";
import {create} from "zustand";

export type ModalType = "createServer" | "reddit" | "invite" | "members" | "channel" | "leaveServer" | "deleteServer" | "deleteChannel" | "messageFile" | "deleteMessage";

interface ModelData {
    server?:server
    channel?:channel
    reddit?:string
    apiUrl?:string
    query?:Record<string,any>
}

interface ModalStore {
    type:ModalType | null;
    isOpen:boolean;
    creditUpdate:boolean;
    data:ModelData;
    onOpen:(type:ModalType,data?:ModelData)=> void;
    onClose:()=>void;
    onCredit:(value:boolean)=>void;
    creditPoint:number;
    creditValue:(val:any)=>void;
    aiPrompt:boolean;
    promptGenerated:(val:any)=>void;
}

export const useModal = create<ModalStore>((set)=>({
    type:null,
    isOpen:false,
    creditUpdate:false,
    data:{},
    creditPoint:0,
    aiPrompt:false,
    onOpen:(type,data?:{})=> set({isOpen:true,type,data}),
    onClose:()=>set({type:null,isOpen:false}),
    onCredit:(value:boolean)=> set({creditUpdate:value}),
    creditValue:(value:any)=>set({creditPoint:value}),
    promptGenerated:(value:any)=>set({aiPrompt:value}),
}))
