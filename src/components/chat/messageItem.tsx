import { memo } from 'react'
import { Avatar, Image as MantineImage } from '@mantine/core'

const MessageItem = memo(({ message, user, chatPartner, onImageClick }: any) => {
  
  const isOwnMessage = message.senderId === user?._id || message.senderId._id === user?._id

  return (
    <div className={`flex items-end gap-2 ${isOwnMessage ? 'justify-end' : ''}`}>
      {!isOwnMessage && <Avatar src={chatPartner?.chatPartner?.avatar} size="sm" radius="xl" />}
      <div className={`p-2 rounded-lg max-w-[70%] ${isOwnMessage ? 'bg-green-600 text-white' : 'bg-gray-100'}`}>
        {message.content && <p>{message.content}</p>}
        {(message.image || message.file) && (
          <div className="cursor-pointer" onClick={() => onImageClick(message.image || message.file)}>
            <MantineImage
              src={message.image || message.file}
              alt="Sent image"
              radius="md"
              fit="contain"
              className="max-h-[200px] max-w-[200px]"
            />
          </div>
        )}
        <span className="text-xs text-gray-800 block mt-1">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  )
})

export default MessageItem

MessageItem.displayName = 'MessageItem'
