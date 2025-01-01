import { Product, ProductsClient } from '@/types/users/productTypes'
import { create } from 'zustand'

type State = {
  productsPropose: Product[]
  product: Product
  products: ProductsClient[]
  openAddToCardModal: boolean
  productToAdd: ProductsClient
  openCartDrawer: boolean
  openOrderNowModal: boolean

  openCodeModal: boolean
  openRefundModal: boolean
  openBuyModal: boolean
}

type Actions = {
  setProductsPropose: (products: Product[]) => void
  setProduct: (product: Product) => void
  setProducts: (products: ProductsClient[]) => void
  toggleAddToCardModal: () => void
  setProductToAdd: (product: ProductsClient) => void
  handleUniqueSizes: (product: ProductsClient) => string[]
  handleUniqueColors: (product: ProductsClient) => string[]
  toggleCartDrawer: () => void
  toggleOrderNowModal: () => void

  toggleCodeModal: () => void
  toggleRefundModal: () => void
  toggleBuyModal: () => void
}

export const useProductClient = create<State & Actions>((set) => ({
  productsPropose: [],
  product: {} as Product,
  products: [],
  openAddToCardModal: false,
  productToAdd: {} as ProductsClient,
  openCartDrawer: false,
  openOrderNowModal: false,

  openCodeModal: false,
  openRefundModal: false,
  openBuyModal: false,

  handleUniqueSizes: (product) => {
    return Array.from(new Set(product.sizeVariants.map((v) => v.size)))
  },
  handleUniqueColors: (product) => {
    return Array.from(new Set(product.sizeVariants.map((v) => v.colors)))
  },
  setProductToAdd: (product) => set({ productToAdd: product }),
  setProductsPropose: (products) => set({ productsPropose: products }),
  setProduct: (product) => set({ product }),
  setProducts: (products) => set({ products }),
  toggleAddToCardModal: () => set((state) => ({ openAddToCardModal: !state.openAddToCardModal })),
  toggleCartDrawer: () => set((state) => ({ openCartDrawer: !state.openCartDrawer })),
  toggleOrderNowModal: () => set((state) => ({ openOrderNowModal: !state.openOrderNowModal })),

  toggleCodeModal: () => set((state) => ({ openCodeModal: !state.openCodeModal })),
  toggleRefundModal: () => set((state) => ({ openRefundModal: !state.openRefundModal })),
  toggleBuyModal: () => set((state) => ({ openBuyModal: !state.openBuyModal })),
}))
