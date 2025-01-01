import { NotificationType } from '@/types/notificationType'
import { create } from 'zustand'

type State = {
  notifications: NotificationType[]
}

type Actions = {
  setNotifications: (notifications: NotificationType[]) => void
}

export const useNotificationStore = create<State & Actions>((set) => ({
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
}))
