import { create } from 'zustand'

type State = {
  openUpdateFormStyle: boolean
}

type Actions = {
  toogleUpdateFormStyle: () => void
}

export const useUserStyle = create<State & Actions>((set) => ({
  openUpdateFormStyle: false,
  toogleUpdateFormStyle: () =>
    set((state) => ({ openUpdateFormStyle: !state.openUpdateFormStyle })),
}))
