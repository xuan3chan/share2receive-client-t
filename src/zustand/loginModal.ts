import { create } from "zustand";

type State = {
  isOpen: boolean;
  isLoading: boolean;
  openModal: () => void;
  closeModal: () => void;
  setLoading: (value: boolean) => void;
};

export const useLoginModal = create<State>((set) => ({
  isOpen: false,
  isLoading: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  setLoading: (value) => set({ isLoading: value }),
}));
