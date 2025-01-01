'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserAction } from '@/zustand/user'
import { mutate } from 'swr'

const FloatChatRoom = dynamic(() => import('./floatChatRoom'))
const ChatBox = dynamic(() => import('./chatBox'))

const MAX_CHAT_BOXES = 3
const CHAT_BOX_WIDTH = 330
const CHAT_BOX_MARGIN = 20

const Chat = () => {
  const activeChats = useUserAction((state) => state.activeChats)
  const setActiveChats = useUserAction((state) => state.setActiveChats)
  const setChatUsers = useUserAction((state) => state.setChatUsers)
  const chatusers = useUserAction((state) => state.chatusers)

  const handleUserSelect = (user: any) => {
    if (activeChats.length >= MAX_CHAT_BOXES) {
      alert('Bạn chỉ có thể mở tối đa 3 cuộc trò chuyện cùng lúc')
      return
    }

    if (activeChats.some((chat) => chat.chatPartner._id === user.chatPartner._id)) {
      return
    }

    setActiveChats([...activeChats, user])

    setChatUsers(chatusers.filter((u) => u.chatPartner._id !== user.chatPartner._id))
  }

  const handleMinimizeChat = (user: any) => {
    mutate('/api/messages/get-room')
    setActiveChats(activeChats.filter((chat) => chat.message._id !== user.message._id))
    setChatUsers([...chatusers, user])
  }

  // Tính toán vị trí cho mỗi chatbox
  const getChatBoxPosition = (index: number) => {
    const totalWidth = CHAT_BOX_WIDTH + CHAT_BOX_MARGIN
    const baseRight = 430
    return {
      right: baseRight + totalWidth * index,
      zIndex: 1000 - index,
    }
  }

  return (
    <div className="fixed z-50 bottom-0 right-0">
      <FloatChatRoom users={chatusers} onUserSelect={handleUserSelect} />
      <AnimatePresence>
        {activeChats.map((user, index) => (
          <motion.div
            key={user.message.roomId}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            style={{
              position: 'fixed',
              right: getChatBoxPosition(index).right,
              bottom: 0,
              zIndex: getChatBoxPosition(index).zIndex,
            }}
          >
            <ChatBox
              key={user.message.roomId}
              roomId={user.message.roomId}
              userChat={user}
              onMinimize={() => handleMinimizeChat(user)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default Chat
