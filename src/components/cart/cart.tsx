import dynamic from 'next/dynamic'
const CartDrawer = dynamic(() => import('@/components/cart/cartDrawer'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

export default function Cart() {
  return <CartDrawer />
}
