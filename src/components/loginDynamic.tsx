import dynamic from 'next/dynamic'

const Login = dynamic(() => import('@/components/loginModal'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

export default function LoginDynamic() {
  return <Login />
}
