import { useEffect, useCallback, useRef } from 'react'
import { useSocket } from '@/hooks/useSocket'

const useChatSocket = (messages: any[], roomId: string, updateMessages: (messages: any[]) => void) => {
  const isSocketInitialized = useRef(false)
  const { socket } = useSocket()

  const joinRoom = useCallback(() => {
    if (socket) {
      socket.emit('joinRoom', roomId)

      const handlePreviousMessages = (messages: any[]) => {
        updateMessages(messages)
      }

      // const handleReceiveMessage = (message: any) => {
      //   updateMessages([message])
      // }

      socket.on('previousMessages', handlePreviousMessages)
      // socket.on('receiveMessage', handleReceiveMessage)

      isSocketInitialized.current = true

      return () => {
        // socket.off('receiveMessage', handleReceiveMessage)
        socket.off('previousMessages', handlePreviousMessages)
        isSocketInitialized.current = false
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, roomId, messages])

  useEffect(() => {
    const cleanup = joinRoom()
    return cleanup
  }, [joinRoom])
}
export default useChatSocket
