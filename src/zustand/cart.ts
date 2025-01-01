import { CartItem } from '@/types/cart'
import { create } from 'zustand'

type CartState = {
  cartItem: CartItem
  cartItems: CartItem[]
  summary: {
    totalAmount: number
    totalTypes: number
    totalPrice: number
  }
}

type CartActions = {
  setCartItem: (cartItem: CartItem) => void
  setCartItems: (cartItems: CartItem[]) => void
  setSummary: (summary: { totalAmount: number; totalTypes: number; totalPrice: number }) => void
}

export const useCart = create<CartState & CartActions>((set) => ({
  cartItem: {} as CartItem,
  cartItems: [],
  summary: {
    totalAmount: 0,
    totalTypes: 0,
    totalPrice: 0,
  },
  setCartItem: (cartItem) => set({ cartItem }),
  setCartItems: (cartItems) => set({ cartItems }),
  setSummary: (summary) => set({ summary }),
}))
