import { create } from 'zustand'

type State = {
  openEdit: boolean
  openEditNote: boolean
}

type Action = {
  toggleEdit: () => void
  toggleEditNote: () => void
}

export const useCheckoutStore = create<State & Action>((set) => ({
  openEdit: false,
  openEditNote: false,
  toggleEdit: () => set((state) => ({ openEdit: !state.openEdit })),
  toggleEditNote: () => set((state) => ({ openEditNote: !state.openEditNote })),
}))
