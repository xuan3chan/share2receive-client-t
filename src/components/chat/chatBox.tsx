'use client'

import { ActionIcon, Avatar, Paper, ScrollArea, TextInput, Modal, Image as MantineImage } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import IconifyIcon from '../icons'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useUserAction } from '@/zustand/user'
import { useAuth } from '@/hooks/useAuth'
import { useSocket } from '@/hooks/useSocket'
import { mutate } from 'swr'

interface ChatBoxProps {
  userChat: MessageTypes
  roomId: string
  onMinimize: () => void
}

import { debounce } from 'lodash'
import { useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { MessageTypes } from '@/types/messageTypes'

const MessageItem = dynamic(() => import('./messageItem'), { ssr: false })

export default function ChatBox({ userChat, roomId, onMinimize }: ChatBoxProps) {
  const { setActiveChats, activeChats } = useUserAction()
  const [localMessages, setLocalMessages] = useState<any[]>([])
  const [messageInput, setMessageInput] = useState('')
  const [showEmoji, setShowEmoji] = useState(false)
  const [imagePreview, { open: openImagePreview, close: closeImagePreview }] = useDisclosure(false)
  const [selectedImage, setSelectedImage] = useState<string | undefined>('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [room, setRoom] = useState(roomId)

  const { user } = useAuth()
  const { socket } = useSocket()

  useEffect(() => {
    if (!user || !userChat?.chatPartner) return
  
    if (socket) {
      setIsLoading(true)
      socket.emit('joinRoom', room)
      mutate('/api/messages/get-room')
  
      socket.on('previousMessages', (messages) => {
        setLocalMessages(messages)
        setIsLoading(false)
      })
  
      socket.on('receiveMessage', (message) => {
        setLocalMessages((prev) => [...prev, message])
        mutate('/api/messages/get-room')
      })
  
      return () => {
        socket.off('previousMessages')
        socket.off('receiveMessage')
      }
    }
  }, [user, userChat, socket, room])

  const debouncedScrollToBottom = useMemo(
    () =>
      debounce(() => {
        if (scrollAreaRef.current) {
          const scrollArea = scrollAreaRef.current.querySelector('.mantine-ScrollArea-viewport')
          if (scrollArea) {
            scrollArea.scrollTop = scrollArea.scrollHeight
          }
        }
      }, 100),
    [],
  )

  useEffect(() => {
    debouncedScrollToBottom()
    return () => debouncedScrollToBottom.cancel()
  }, [localMessages, debouncedScrollToBottom])

  const handleSendMessage = useCallback(
    async (file: any | null) => {
      if (!messageInput.trim() && !file) return

      const message = {
        senderId: user?._id,
        receiverId: userChat?.chatPartner?._id,
        content: messageInput.trim() || null,
        file: file,
        fileName: file ? file.name : null,
        fileType: file ? file.type : null,
        createdAt: new Date().toISOString(),
      }

      if (socket) {
        socket.emit('sendMessage', message)
      }

      setLocalMessages((prev) => [...prev, { ...message, isTemp: true }])
      setMessageInput('')
      mutate('/api/messages/get-room')
    },
    [messageInput, socket, user?._id, userChat?.chatPartner?._id],
  )

  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value)
  }, [])

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert('Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 5MB')
          return
        }

        const reader = new FileReader()
        reader.onloadend = () => {
          setSelectedImage(reader.result as string)
          const message = {
            senderId: user?._id,
            receiverId: userChat?.chatPartner?._id,
            content: null,
            file: reader.result as string,
            fileName: file.name,
            fileType: file.type,
            createdAt: new Date().toISOString() as string,
          }

          if (socket) {
            socket.emit('sendMessage', message)
          }

          setLocalMessages((prev) => [...prev, { ...message, isTemp: true }])
          mutate('/api/messages/get-room')
        }

        reader.readAsDataURL(file)

        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    },
    [socket, user?._id, userChat?.chatPartner?._id],
  )

  const handleEmojiSelect = useCallback(
    (emoji: any) => {
      const cursor = (document.activeElement as HTMLInputElement)?.selectionStart || messageInput.length
      const newMessage = messageInput.slice(0, cursor) + emoji.native + messageInput.slice(cursor)
      setMessageInput(newMessage)
    },
    [messageInput],
  )

  const memoizedMessages = useMemo(() => {
    return localMessages.map((message: any, index: number) => (
      <MessageItem
        key={message._id || index}
        message={message}
        user={user}
        chatPartner={userChat}
        onImageClick={(image: string) => {
          setSelectedImage(image)
          openImagePreview()
        }}
      />
    ))
  }, [localMessages, user, userChat, openImagePreview])

  return (
    <Paper className="fixed bottom-0 z-max w-[330px] max-w-[330px] h-[455px] rounded-t-lg shadow-2xl">
      <div className="h-14 bg-green-700 rounded-t-lg px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar src={userChat?.chatPartner?.avatar} size="md" radius="xl" />
          <div className="text-white">
            <p className="font-semibold">{userChat?.chatPartner?.firstname + ' ' + userChat?.chatPartner?.lastname}</p>
            <p className="text-sm">Đang hoạt động</p>
          </div>
        </div>
        <div className="flex gap-2">
          <ActionIcon
            variant="transparent"
            color="white"
            onClick={() => {
              onMinimize()
              socket?.emit('leaveRoom', room)
            }}
          >
            <IconifyIcon icon="pepicons-pop:minus" fontSize={24} />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            color="white"
            onClick={() => {
              setActiveChats(activeChats.filter((chat) => chat.chatPartner._id !== userChat?.chatPartner._id))
              setLocalMessages([])
              socket?.emit('leaveRoom', room)
              setRoom('')
            }}
          >
            <IconifyIcon icon="material-symbols:close" fontSize={24} />
          </ActionIcon>
        </div>
      </div>

      <ScrollArea h={340} w={330} px="md" pb="md" ref={scrollAreaRef}>
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-[300px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700" />
            </div>
          ) : localMessages.length === 0 ? (
            <div className="flex justify-center items-center h-[300px] text-gray-500 text-center px-4">
              Hãy gửi tin nhắn để bắt đầu cuộc trò chuyện
            </div>
          ) : (
            memoizedMessages
          )}
        </div>
      </ScrollArea>

      <div className="absolute bottom-0 w-full p-3 bg-white border-t">
        <div className="flex items-center justify-between w-full gap-2">
          <TextInput
            style={{
              width: '100%',
            }}
            value={messageInput}
            onChange={handleMessageChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage(null)
            }}
            placeholder="Nhập tin nhắn..."
          />
          <div className="flex gap-2">
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
            <ActionIcon
              variant="transparent"
              color="gray"
              onClick={(e) => {
                e.stopPropagation()
                setShowEmoji(!showEmoji)
              }}
            >
              <IconifyIcon icon="solar:sticker-smile-square-bold" />
            </ActionIcon>
            <ActionIcon variant="transparent" color="gray" onClick={() => fileInputRef.current?.click()}>
              <IconifyIcon icon="material-symbols:image" />
            </ActionIcon>
          </div>
        </div>
        {showEmoji && (
          <div className="absolute bottom-14 right-0" onClick={(e) => e.stopPropagation()}>
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              theme="light"
              locale="vi"
              onClickOutside={() => setShowEmoji(false)}
            />
          </div>
        )}
      </div>

      <Modal opened={imagePreview} onClose={closeImagePreview} size="lg" centered>
        <MantineImage src={selectedImage} alt="Preview" fit="contain" />
      </Modal>
    </Paper>
  )
}
