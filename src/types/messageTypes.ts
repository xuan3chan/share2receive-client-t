export type MessageTypes = {
  message: {
    _id: string
    roomId: string
    image: string
    createdAt: string
    updatedAt: string
    content?: string
    myId: string
  }
  unreadCount: number
  chatPartner: {
    _id: string
    firstname: string
    lastname: string
    avatar: string
  }
}

export type ChatContentTypes = {
  _id: string
  content?: string
  image?: string
  createdAt: string
  isRead: boolean
  receiverId: {
    _id: string
    firstname: string
    lastname: string
    avatar: string
  }
  roomId: string
  senderId: {
    _id: string
    firstname: string
    lastname: string
    avatar: string
  }
  updatedAt: string
}
