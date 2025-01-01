'use client'
import { createContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuth } from '@/hooks/useAuth'

interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    // Khởi tạo kết nối socket

    if (!user) {
      return
    }
    const accessToken = localStorage.getItem('accessToken')

    const socketInstance = io(process.env.NEXT_PUBLIC_API_URL, {
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    socketInstance.on('connect', () => {
      setIsConnected(true)
      console.log('Connected to socket')
    })

    socketInstance.on('disconnect', () => {
      setIsConnected(false)
      console.log('Disconnected from socket')
      // Không cần phải tự reconnect lại ở đây vì socket.io đã tự động reconnect
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [user])

  return <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>
}

export { SocketContext, SocketProvider }
