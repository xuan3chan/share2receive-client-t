'use client'

import { Menu, Avatar } from '@mantine/core'
import { useUserAction } from '@/zustand/user'
import { MessageTypes } from '@/types/messageTypes'
import { mutate } from 'swr'

export default function ChatDropdown() {
  const setActiveChats = useUserAction((state) => state.setActiveChats)
  const setRoomId = useUserAction((state) => state.setRoomId)
  const chatusers = useUserAction((state) => state.chatusers)
  const activeChats = useUserAction((state) => state.activeChats)
  const setChatUsers = useUserAction((state) => state.setChatUsers)
  const rooms = useUserAction((state) => state.rooms)

  const isMobile = window.innerWidth < 768

  const handleSelectChat = (item: MessageTypes) => {
    mutate('/api/messages/get-room')
    const isInActiveChats = activeChats.some((chat) => chat.chatPartner._id === item.chatPartner._id)
    const isInChatUsers = chatusers.some((chat) => chat.chatPartner._id === item.chatPartner._id)

    if (!isInActiveChats && !isInChatUsers) {
      setActiveChats([...activeChats, item])
      mutate('/api/messages/get-room')
    } else if (isInChatUsers) {
      setChatUsers(chatusers.filter((chat) => chat.chatPartner._id !== item.chatPartner._id))
      setActiveChats([...activeChats, item])
      mutate('/api/messages/get-room')
    } else {
      const filteredChats = activeChats.filter((chat) => chat.chatPartner._id !== item.chatPartner._id)
      setActiveChats([...filteredChats, item])
      mutate('/api/messages/get-room')
    }

    setRoomId([item.message.myId, item.chatPartner._id].sort().join('_'))
  }

  return (
    <>
      {rooms?.map((item) => (
        <Menu.Item key={item.message._id} onClick={() => handleSelectChat(item)}>
          <div className="flex flex-row items-center">
            <Avatar src={item.chatPartner.avatar} size={isMobile ? 'md' : 'lg'} radius="xl" />
            <div className="ml-2 md:ml-3">
              <p className="text-sm font-semibold">{item.chatPartner.firstname + ' ' + item.chatPartner.lastname}</p>
              <p className="text-xs text-gray-600">{item.message?.content}</p>
            </div>
            {item.unreadCount > 0 && (
              <div className="ml-auto bg-blue-500 text-white text-xs truncate rounded-full px-[11px] py-1">
                {item.unreadCount}
              </div>
            )}
          </div>
        </Menu.Item>
      ))}
    </>
  )
}
