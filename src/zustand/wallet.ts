import { Wallet } from '@/types/wallet'
import { create } from 'zustand'

type State = {
  wallet: Wallet
}

type Actions = {
  setWallet: (wallet: Wallet) => void
}

export const useWalletStore = create<State & Actions>((set) => ({
  wallet: {} as Wallet,
  setWallet: (wallet) => set({ wallet }),
}))
