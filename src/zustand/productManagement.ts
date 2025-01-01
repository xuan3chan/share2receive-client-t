import { create } from 'zustand'
import { Product } from '@/types/users/productTypes'

type State = {
  openAddProductModal: boolean
  openEditProductModal: boolean
  openDeleteProductModal: boolean
  openUploadImageModal: boolean
  openViewProductModal: boolean
  products: Product[]
  product: Product
  openAddressModal: boolean
}

type Actions = {
  toggleAddProductModal: () => void
  toggleEditProductModal: () => void
  toggleDeleteProductModal: () => void
  toggleUploadImageModal: () => void
  toggleViewProductModal: () => void
  setProducts: (products: Product[]) => void
  setProduct: (product: Product) => void
  setOpenAddressModal: (open: boolean) => void
}

export const useProductManagement = create<State & Actions>((set) => ({
  openAddProductModal: false,
  openEditProductModal: false,
  openDeleteProductModal: false,
  openUploadImageModal: false,
  openViewProductModal: false,
  products: [],
  product: {} as Product,
  openAddressModal: false,
  toggleAddProductModal: () => set((state) => ({ openAddProductModal: !state.openAddProductModal })),
  toggleEditProductModal: () => set((state) => ({ openEditProductModal: !state.openEditProductModal })),
  toggleDeleteProductModal: () => set((state) => ({ openDeleteProductModal: !state.openDeleteProductModal })),
  toggleUploadImageModal: () => set((state) => ({ openUploadImageModal: !state.openUploadImageModal })),
  toggleViewProductModal: () => set((state) => ({ openViewProductModal: !state.openViewProductModal })),
  setProducts: (products) => set({ products }),
  setProduct: (product) => set({ product }),
  setOpenAddressModal: (open) => set({ openAddressModal: open }),
}))
