'use client'
import { ProductsClient } from '@/types/users/productTypes'
import { Button } from 'antd'
import IconifyIcon from '../icons'
import { useUserAction } from '@/zustand/user'
import { useProductClient } from '@/zustand/productClient'
import { mutate } from 'swr'
export default function ButtonSection({
  product,
  user,
  onCreateExchange,
}: {
  product: ProductsClient
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any
  onCreateExchange: () => void
}) {
  const { setRoomId, setActiveChats, setChatPartner, setChatUsers, RoomId, chatusers } = useUserAction()
  const { toggleAddToCardModal, setProductToAdd, toggleOrderNowModal } = useProductClient()

  const handleSelectChat = (item: ProductsClient) => {
    setRoomId([user?._id, item.userId._id].sort().join('_'))
    setActiveChats([
      {
        chatPartner: {
          _id: item.userId._id,
          avatar: item.userId.avatar,
          firstname: item.userId.firstname,
          lastname: item.userId.lastname,
        },
        message: {
          _id: item._id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          image: '',
          roomId: RoomId,
          myId: user?._id || '',
        },
        unreadCount: 0,
      },
    ])
    setChatPartner({
      chatPartner: {
        _id: item.userId._id,
        avatar: item.userId.avatar,
        firstname: item.userId.firstname,
        lastname: item.userId.lastname,
      },
      message: {
        _id: item._id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        image: '',
        roomId: RoomId,
        myId: user?._id || '',
      },
      unreadCount: 0,
    })
    setChatUsers(chatusers.filter((u) => u.message._id !== item._id))
    mutate('/api/messages/get-room')
  }

  if (!user) {
    return (
      <>
        <p className="font-semibold text-lg text-red-600">
          Bạn cần thực hiện đăng nhập để có thể mua hàng hoặc trao đổi sản phẩm
        </p>
      </>
    )
  }

  if (product.userId._id === user._id) {
    return null
  }

  return (
    <>
      <div className="flex flex-row">
        {product.type === 'barter' && (
          <>
            <Button
              disabled={!user || user._id === product.userId._id}
              onClick={() => {
                handleSelectChat(product)
              }}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                marginRight: '16px',
                width: '300px',
                height: '55px',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: '#b2e5be',
                color: '#179d49',
              }}
            >
              Liên hệ ngay
            </Button>

            <Button
              disabled={!user}
              onClick={onCreateExchange}
              variant="outlined"
              type="primary"
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                marginRight: '16px',
                width: '300px',
                height: '55px',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: '#179d49',
                color: '#fff',
              }}
            >
              Trao đổi ngay
            </Button>
            {!user && <p className="text-sm text-red-500">Đăng nhập để tạo yêu cầu trao đổi</p>}
          </>
        )}

        {product.type === 'sale' && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-3">
              <Button
                onClick={() => {
                  setProductToAdd(product)
                  toggleAddToCardModal()
                }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  width: '200px',
                  height: '55px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  backgroundColor: '#b2e5be',
                  color: '#179d49',
                }}
              >
                Thêm vào giỏ hàng
              </Button>

              <Button
                onClick={() => {
                  setProductToAdd(product)
                  toggleOrderNowModal()
                }}
                variant="outlined"
                type="primary"
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  width: '200px',
                  height: '55px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  backgroundColor: '#179d49',
                  color: '#fff',
                }}
              >
                Mua ngay
              </Button>
            </div>
            <Button
              onClick={() => {
                handleSelectChat(product)
              }}
              variant="outlined"
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                marginRight: '16px',
                width: '100%',
                height: '55px',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: '#fff',
                color: '#179d49',
              }}
            >
              Liên hệ ngay
            </Button>
          </div>
        )}
        {product.type === 'donate' && (
          <>
            <Button
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                marginRight: '16px',
                width: '200px',
                height: '55px',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: '#b2e5be',
                color: '#179d49',
              }}
            >
              Yêu thích <IconifyIcon icon="fluent-emoji-flat:red-heart" />
            </Button>

            <Button
              variant="outlined"
              type="primary"
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                marginRight: '16px',
                width: '200px',
                height: '55px',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: '#179d49',
                color: '#fff',
              }}
            >
              Liên hệ ngay
            </Button>
          </>
        )}
      </div>
    </>
  )
}
