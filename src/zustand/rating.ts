import { create } from 'zustand'

type State = {
  openRatingModal: boolean
  userId: string
}

type Actions = {
  toggleRatingModal: () => void
  setUserId: (userId: string) => void
}

const useRatingStore = create<State & Actions>((set) => ({
  openRatingModal: false,
  userId: '',
  toggleRatingModal: () => set((state) => ({ openRatingModal: !state.openRatingModal })),
  setUserId: (userId) => set(() => ({ userId })),
}))

export default useRatingStore
