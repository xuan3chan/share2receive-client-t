import axiosClient from '@/lib/axios'
import { NotificationType } from '@/types/notificationType'

const notificationService = {
  getNotifications: async (): Promise<NotificationType[]> => {
    const res: NotificationType[] = await axiosClient.get('api/notification/get-notification')
    return res
  },

  updateNotification: (notificationId: string) => {
    axiosClient.patch(`/api/notification/update-notification?notificationId=${notificationId}`)
  },
}

export default notificationService
