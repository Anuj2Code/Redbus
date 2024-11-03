"use client";

import {
  useContext,
  createContext,
  useEffect,
  useState
}
  from "react"

import { io as ClientIo } from "socket.io-client";

type SocketContextType = {
  socket: null | any;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false
})

// custom hook for using this context 
export const useSocket = () => {
  return useContext(SocketContext);
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setConnected] = useState(false);

  useEffect(() => {
    
    const socketInstance = new (ClientIo as any)(process.env.NEXT_PUBLIC_SITE_URL!, {   // connecting to the server
      path: "/api/socket/io",
      addTrailingSlash: false
    })
    // listen for the message from the server

    socketInstance.on("connect", () => {
      setConnected(true);
    })
    socketInstance.on("disconnect", () => {
      setConnected(false)
    })

    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, [])

  return (
    <SocketContext.Provider value={{socket,isConnected}}>
      {children}
    </SocketContext.Provider>
  )
}