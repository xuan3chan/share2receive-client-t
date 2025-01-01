import { Category } from '@/types/clientypes'
import { create } from 'zustand'

type State = {
  categories: Category[] | null
  category: Category
}

type Actions = {
  setCategories: (categories: Category[] | null) => void
  setCategory: (category: Category) => void
}

export const useCategory = create<State & Actions>((set) => ({
  categories: null,
  category: {} as Category,

  setCategories: (categories) => set({ categories }),
  setCategory: (category) => set({ category }),
}))
