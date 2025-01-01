'use client'

import { useUserAction } from '@/zustand/user'
import { Tooltip } from '@mantine/core'
import Image from 'next/image'
import IconifyIcon from '../icons'
import ScrollingUp from '@/partials/up'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageTypes } from '@/types/messageTypes'
import { useSocket } from '@/hooks/useSocket'

interface ChatRoomProps {
  users: MessageTypes[]
  onUserSelect: (user: MessageTypes) => void
}


export default function FloatChatRoom({ users, onUserSelect }: ChatRoomProps) {
  const { setChatUsers, chatusers } = useUserAction()
  const { socket } = useSocket()

  const handleRemoveUser = (id: string) => {
    setChatUsers(chatusers.filter((u) => u.message._id !== id))
  }

  console.log(chatusers)

  return (
    <div className="fixed bottom-10 right-7 z-40 transition-all space-y-3">
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {users.map((item) => (
            <Tooltip
              key={item.message._id}
              withArrow
              arrowSize={10}
              position="left"
              label={
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex flex-col items-start"
                >
                  <p className="text-sm font-semibold">
                    {item.chatPartner?.firstname + ' ' + item.chatPartner?.lastname}
                  </p>
                  <p className="text-gray-500 text-sm font-normal">{item.message?.content}</p>
                </motion.div>
              }
              transitionProps={{ transition: 'fade-left', duration: 200 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
                className="relative group"
              >
                <Image
                  src={item.chatPartner?.avatar}
                  alt={item.chatPartner?.firstname + ' ' + item.chatPartner?.lastname}
                  width={50}
                  height={50}
                  className="rounded-full hover:shadow-lg cursor-pointer w-12 h-12"
                  style={{ objectFit: 'cover' }}
                  quality={70}
                  onClick={() => {
                    onUserSelect(item)
                  }}
                />
                <span
                  className="absolute -top-1 -right-1 cursor-pointer group-hover:block hidden bg-white rounded-full"
                  onClick={() => {
                    handleRemoveUser(item.message._id)
                    socket?.emit('leaveRoom', item.message.roomId)
                  }}
                >
                  <IconifyIcon
                    icon="flowbite:close-circle-solid"
                    className="text-red-500 hover:text-red-600"
                    fontSize={20}
                  />
                </span>
              </motion.div>
            </Tooltip>
          ))}
        </AnimatePresence>
      </div>
      <ScrollingUp />
    </div>
  )
}
