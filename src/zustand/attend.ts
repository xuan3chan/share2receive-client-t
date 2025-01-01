import { Attendances } from '@/types/attend'
import { create } from 'zustand'

type State = {
  openAttendModal: boolean
  attendances: Attendances[]
}

type Actions = {
  toggleAttendModal: () => void
  setAttendances: (attendances: Attendances[]) => void
}

export const useAttend = create<State & Actions>((set) => ({
  openAttendModal: false,
  attendances: [],
  toggleAttendModal: () => set((state) => ({ openAttendModal: !state.openAttendModal })),
  setAttendances: (attendances) => set({ attendances }),
}))
