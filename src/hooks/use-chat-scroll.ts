import { useEffect, useState } from "react"

type scrollProps = {
    chatRef: React.RefObject<HTMLDivElement>,
    bottomRef: React.RefObject<HTMLDivElement>,
    shouldLoadMore: boolean,
    loadmore: () => void,
    count: number
}

export const useChatScroll = ({chatRef,bottomRef,shouldLoadMore,loadmore,count}:scrollProps)=>{
     const [hasInitialised,setIsInitialised] = useState(false);

     useEffect(()=>{
       const topDiv = chatRef?.current

       const scroll = ()=>{
         const scrollTop = topDiv?.scrollTop

         if(scrollTop ===0  && shouldLoadMore){
             loadmore()
         }
       }
       topDiv?.addEventListener("scroll",scroll);

       return ()=>{
         topDiv?.removeEventListener("scroll",scroll)
       }
     },[shouldLoadMore,loadmore,chatRef])

     useEffect(()=>{
       const bottomDiv = bottomRef?.current
       const topDiv = chatRef?.current

       const shouldAutoScroll = () =>{
         if(!hasInitialised && bottomDiv){
            setIsInitialised(true)
            return true;
         }
         if(!topDiv){
            return false;
         }
         const distance = topDiv.scrollHeight - topDiv.scrollTop -topDiv.clientHeight;
         return distance<=100
       }
   
       if(shouldAutoScroll()){
          setTimeout(()=>{
            bottomRef.current?.scrollIntoView({
                behavior:'smooth'
            })
          },100)
       }

     },[bottomRef,chatRef,count,hasInitialised])
}

