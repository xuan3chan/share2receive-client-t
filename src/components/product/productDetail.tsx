'use client'
import { ProductsClient } from '@/types/users/productTypes'
import classes from '@/styles/product.module.css'
import { useEffect, useState } from 'react'
import { useGetName } from '@/helper/getName'
import { useExchange } from '@/zustand/exchange'
import { useAuth } from '@/hooks/useAuth'
import dynamic from 'next/dynamic'
import { notification } from 'antd'
import { useProductClient } from '@/zustand/productClient'
import cartService from '@/services/cart/cart.service'
import toast from 'react-hot-toast'
import { mutate } from 'swr'
import orderService from '@/services/order/order.service'
import { useRouter } from 'next/navigation'
import IconifyIcon from '../icons'
import { UnstyledButton } from '@mantine/core'
import { useOrderStore } from '@/zustand/order'
import { RessonProduct } from '@/constants/resson'

const RelatedProduct = dynamic(() => import('./relatedProduct'), { ssr: false, loading: () => <div /> })
const ViewRatingModal = dynamic(() => import('../rating/rating'), { ssr: false, loading: () => <div /> })
const CreateExchangeModal = dynamic(() => import('../exchange/openCreateExchange'), {
  ssr: false,
  loading: () => <div />,
})
const ReportModal = dynamic(() => import('../checkout/reportModal'), { ssr: false, loading: () => <div /> })
const AddToCard = dynamic(() => import('./addToCard'), { ssr: false, loading: () => <div /> })
const ProductOverview = dynamic(() => import('./productOverview'), { ssr: false, loading: () => <div /> })
const InforProduct = dynamic(() => import('./inforProduct'), { ssr: false, loading: () => <div /> })

export default function ProductDetail({ product }: { product: ProductsClient }) {
  const [api, contextHolder] = notification.useNotification()
  const [count, setCount] = useState(1)
  const [mainImage, setMainImage] = useState(product.imgUrls[0]) // New state for the main image
  const { getMaterialName, getConditionName, getStyleName } = useGetName()
  const { setOpenCreateExchangeModal, setData } = useExchange()
  const { openAddToCardModal, toggleAddToCardModal, openOrderNowModal, toggleOrderNowModal } = useProductClient()
  const { toggleReportModal, setSubOrderId } = useOrderStore()
  const router = useRouter()
  const uniqueSizes = Array.from(new Set(product.sizeVariants.map((v) => v.size)))
  const uniqueColors = Array.from(new Set(product.sizeVariants.map((v) => v.colors)))

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [maxQuantity, setMaxQuantity] = useState<number>(1)
  const [totalQuantity, setTotalQuantity] = useState<number>(0)

  const validColors = selectedSize
    ? product.sizeVariants.filter((variant) => variant.size === selectedSize).map((variant) => variant.colors)
    : uniqueColors

  const validSizes = selectedColor
    ? product.sizeVariants.filter((variant) => variant.colors === selectedColor).map((variant) => variant.size)
    : uniqueSizes

  // Function to update the max quantity based on selected size and color
  const updateMaxQuantity = () => {
    const selectedVariant = product.sizeVariants.find(
      (variant) => variant.size === selectedSize && variant.colors === selectedColor,
    )
    if (selectedVariant) {
      setMaxQuantity(selectedVariant.amount)
    } else {
      setMaxQuantity(1)
    }
  }

  // Function to update max quantity and total quantity
  const updateQuantities = () => {
    if (selectedSize && selectedColor) {
      const selectedVariant = product.sizeVariants.find(
        (variant) => variant.size === selectedSize && variant.colors === selectedColor,
      )
      if (selectedVariant) {
        setMaxQuantity(selectedVariant.amount)
        setTotalQuantity(selectedVariant.amount)
      } else {
        setMaxQuantity(1)
        setTotalQuantity(0)
      }
    } else {
      // If no specific size or color is selected, sum all quantities
      const total = product.sizeVariants.reduce((sum, variant) => sum + variant.amount, 0)
      setTotalQuantity(total)
      setMaxQuantity(total) // Assuming maxQuantity is total for the initial view
    }
  }

  // Call updateMaxQuantity whenever selectedSize or selectedColor changes
  useEffect(() => {
    updateQuantities()
    updateMaxQuantity()
    setCount(1) // Reset count to 1 whenever the selection changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSize, selectedColor])

  const handleSizeToggle = (size: string) => {
    setSelectedSize(selectedSize === size ? null : size)
  }

  const handleColorToggle = (color: string) => {
    setSelectedColor(selectedColor === color ? null : color)
  }

  const onCreateExchange = async () => {
    if (!selectedSize || !selectedColor) {
      api.error({
        message: 'Lỗi',
        description: 'Vui lòng chọn kích cỡ và màu sắc trước khi tạo yêu cầu trao đổi',
        placement: 'topRight',
      })
      return
    }

    const exchangeData = {
      productId: product._id,
      size: selectedSize,
      colors: selectedColor,
      amount: count.toString(), // Convert amount to string
    }

    setData(exchangeData)
    setOpenCreateExchangeModal(true)
  }

  const handleAddToCard = async () => {
    const data = {
      productId: product._id,
      size: selectedSize || '',
      color: selectedColor || '',
      amount: count,
    }
    await cartService.addToCart(
      data,
      () => {
        toast.success('Đã thêm sản phẩm vào giỏ hàng!')
        mutate('/api/cart')
        close()
        setSelectedColor('')
        setSelectedSize('')
        setCount(1)
      },
      (message: string) => {
        toast.error(message)
      },
    )
  }

  const handleOrderNow = async () => {
    const data = {
      productId: product._id,
      size: selectedSize || '',
      color: selectedColor || '',
      quantity: count,
    }
    await orderService.createOrderNow(
      data,
      (res) => {
        toast.success('Đặt hàng thành công!, chuyển hướng đến trang thanh toán')
        router.push(`/checkout/${res.order._id}`)
      },
      (message) => {
        toast.error('Đã có lỗi xảy ra vui lòng thử lại!')
        console.log(message)
      },
    )
  }

  const { user } = useAuth()

  if (product)
    return (
      <>
        {contextHolder}
        <CreateExchangeModal />
        <ViewRatingModal />
        <ReportModal reportType="product" resson={RessonProduct} />
        <AddToCard
          product={product}
          uniqueColors={uniqueColors}
          uniqueSizes={uniqueSizes}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          validColors={validColors}
          validSizes={validSizes}
          count={count}
          setCount={setCount}
          handleColorToggle={handleColorToggle}
          handleSizeToggle={handleSizeToggle}
          maxQuantity={maxQuantity}
          totalQuantity={totalQuantity}
          setSelectedColor={setSelectedColor}
          setSelectedSize={setSelectedSize}
          open={openAddToCardModal}
          close={() => toggleAddToCardModal()}
          title="Thêm vào giỏ hàng"
          textButton="Thêm vào giỏ hàng"
          handleOnClick={handleAddToCard}
        />
        <AddToCard
          product={product}
          uniqueColors={uniqueColors}
          uniqueSizes={uniqueSizes}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          validColors={validColors}
          validSizes={validSizes}
          count={count}
          setCount={setCount}
          handleColorToggle={handleColorToggle}
          handleSizeToggle={handleSizeToggle}
          maxQuantity={maxQuantity}
          totalQuantity={totalQuantity}
          setSelectedColor={setSelectedColor}
          setSelectedSize={setSelectedSize}
          open={openOrderNowModal}
          close={() => toggleOrderNowModal()}
          title="Đặt hàng ngay"
          textButton="Đặt hàng ngay"
          handleOnClick={handleOrderNow}
        />
        <div className="px-2 py-0 md:px-36 md:py-5 md:mt-5 md:bg-slate-50 relative">
          <ProductOverview
            product={product}
            mainImage={mainImage}
            setMainImage={setMainImage}
            uniqueColors={uniqueColors}
            uniqueSizes={uniqueSizes}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            validColors={validColors}
            validSizes={validSizes}
            count={count}
            handleColorToggle={handleColorToggle}
            handleSizeToggle={handleSizeToggle}
            maxQuantity={maxQuantity}
            totalQuantity={totalQuantity}
            onCreateExchange={onCreateExchange}
            user={user}
            classes={classes}
            setCount={setCount}
          />
          <div className="absolute top-3 right-3">
            <UnstyledButton
              className="p-2 rounded-full hover:bg-slate-200"
              onClick={() => {
                toggleReportModal()
                setSubOrderId(product._id)
              }}
            >
              <IconifyIcon icon="lsicon:flag-filled" className="text-xl text-red-500" />
            </UnstyledButton>
          </div>
        </div>
        <div className="container md:ml-24 md:px-40 w-full">
          <InforProduct
            product={product}
            getMaterialName={getMaterialName}
            getConditionName={getConditionName}
            getStyleName={getStyleName}
          />
        </div>
        <RelatedProduct categoryId={product.categoryId._id} />
      </>
    )
}
