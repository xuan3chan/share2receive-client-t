import axiosClient from '@/lib/axios'
import { MessageTypes } from '@/types/messageTypes'

const messageService = {
  getRooms: (): Promise<MessageTypes[]> => axiosClient.get('/api/messages/get-room'),
}

export default messageService
