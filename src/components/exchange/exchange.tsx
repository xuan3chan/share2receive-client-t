import dynamic from 'next/dynamic'

const ExChangeDrawer = dynamic(() => import('./exchangeDrawer'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

export default function Exchange() {
  return <ExChangeDrawer />
}
