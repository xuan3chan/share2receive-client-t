'use client'
import { Modal, Form, Input, Button, Image, Checkbox } from 'antd'
import { Stepper } from '@mantine/core'
import { useExchange } from '@/zustand/exchange'
import { useState, useEffect } from 'react'
import { Product, SizeE } from '@/types/users/productTypes'
import { truncateText } from '@/helper/format'
import toast from 'react-hot-toast'
import { useClient } from '@/hooks/useClient'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import exChangeService from '@/services/exchange/exchange.service'
import { mutate } from 'swr'
import { useMediaQuery } from '@mantine/hooks'
import NextImage from 'next/image'

export default function CreateExchangeModal() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [form] = Form.useForm()
  const { data, setOpenCreateExchangeModal, openCreateExchangeModal } = useExchange()
  const [productSelected, setProductSelected] = useState<Product>({} as Product)
  const [activeStep, setActiveStep] = useState(0)
  const { productsUser } = useClient()

  const [count, setCount] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [maxQuantity, setMaxQuantity] = useState<number>(0)

  const uniqueSizes = Array.from(new Set(productSelected?.sizeVariants?.map((v) => v.size)))
  const uniqueColors = Array.from(new Set(productSelected?.sizeVariants?.map((v) => v.colors)))

  // Filter color options based on selected size
  const validColors = selectedSize
    ? productSelected.sizeVariants.filter((variant) => variant.size === selectedSize).map((v) => v.colors)
    : uniqueColors

  // Filter size options based on selected color
  const validSizes = selectedColor
    ? productSelected.sizeVariants.filter((variant) => variant.colors === selectedColor).map((v) => v.size)
    : uniqueSizes

  useEffect(() => {
    if (selectedSize && !validSizes.includes(selectedSize as SizeE)) setSelectedSize(null)
    if (selectedColor && !validColors.includes(selectedColor)) setSelectedColor(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validSizes, validColors])

  // Update max quantity based on selected size and color
  useEffect(() => {
    const selectedVariant = productSelected?.sizeVariants?.find(
      (variant) => variant.size === selectedSize && variant.colors === selectedColor,
    )
    setMaxQuantity(selectedVariant ? selectedVariant.amount : 0)
    form.setFieldsValue({ amount: 1 }) // Reset amount to 1 on size or color change
  }, [selectedSize, selectedColor, productSelected.sizeVariants, form])

  const handleSizeChange = (size: string) => {
    const newSize = selectedSize === size ? null : size
    setSelectedSize(newSize)
    form.setFieldsValue({ size: newSize })
  }

  const handleColorChange = (color: string) => {
    const newColor = selectedColor === color ? null : color
    setSelectedColor(newColor)
    form.setFieldsValue({ colors: newColor })
  }

  const finishStep1 = () => {
    if (!productSelected?._id) {
      toast.error('Vui lòng chọn 1 sản phẩm')
      return
    }
    setActiveStep((current) => current + 1)
  }

  const finishStep2 = () => {
    form
      .validateFields(['size', 'colors'])
      .then(() => {
        form.setFieldsValue({
          size: selectedSize,
          colors: selectedColor,
          amount: count,
        })
        setActiveStep((current) => current + 1)
      })
      .catch(() => {
        toast.error('Vui lòng chọn size và màu')
      })
  }

  const onSubmit = () => {
    form.validateFields().then((values) => {
      const newData = {
        requestProduct: {
          productId: productSelected._id,
          size: form.getFieldValue('size'),
          colors: form.getFieldValue('colors'),
          amount: form.getFieldValue('amount'),
        },
        receiveProduct: {
          productId: data.productId,
          size: data.size,
          colors: data.colors,
          amount: Number(data.amount),
        },
        note: values.note,
      }
      console.log(newData)
      // Call API to create exchange
      exChangeService
        .create(newData)
        .then(() => {
          mutate('/api/Exchange/get-list-exchange')
          mutate('exchanges')
          toast.success('Tạo trao đổi thành công')
          form.resetFields()
          setOpenCreateExchangeModal(false)
          setActiveStep(0)
          setProductSelected({} as Product)
          setSelectedSize(null)
          setSelectedColor(null)
        })
        .catch(() => {
          toast.error('Tạo trao đổi thất bại')
        })
    })
  }

  const prevStep = () => {
    setActiveStep((current) => current - 1)
  }

  return (
    <>
      <Modal
        title="Tạo trao đổi"
        open={openCreateExchangeModal}
        footer={false}
        centered
        destroyOnClose
        width={isMobile ? '90%' : '60%'}
        onCancel={() => {
          form.resetFields()
          setOpenCreateExchangeModal(false)
          setActiveStep(0)
          setProductSelected({} as Product)
          setSelectedSize(null)
          setSelectedColor(null)
        }}
      >
        <Form form={form} layout="vertical" name="create-exchange-form">
          <Stepper
            active={activeStep}
            onStepClick={setActiveStep}
            allowNextStepsSelect={false}
            orientation={isMobile ? 'vertical' : 'horizontal'}
          >
            {/* Step 1: Select Product */}
            <Stepper.Step label="Chọn sản phẩm" description="Chọn sản phẩm bạn muốn trao đổi">
              <div className="flex flex-wrap gap-4">
                {productsUser?.map((product) => {
                  if (product?.type === 'barter' && product?.status === 'active' && product?.isBlock !== true)
                    return (
                      <div
                        key={product?._id}
                        className={`flex flex-col items-center justify-center ${
                          productSelected._id === product._id ? 'border-2 border-blue-500 opacity-50' : ''
                        }`}
                        onClick={() => setProductSelected(product)}
                      >
                        <NextImage
                          width={100}
                          height={100}
                          src={product?.imgUrls?.[0]}
                          loading="lazy"
                          alt={product?.productName}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <p>{truncateText(product?.productName, 10)}</p>
                      </div>
                    )
                })}
              </div>
              <div className="flex justify-end">
                <Button disabled={!productSelected?._id} size="large" type="primary" onClick={finishStep1}>
                  Tiếp tục
                </Button>
              </div>
            </Stepper.Step>

            {/* Step 2: Select Size, Color, and Quantity */}
            <Stepper.Step label="Chọn các thay đổi" description="Chọn size màu và số lượng">
              <div>
                <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-start gap-3`}>
                  <div className={`relative ${isMobile ? 'w-full' : 'w-[100px]'} h-[120px] my-2 overflow-hidden`}>
                    <Image
                      src={productSelected?.imgUrls?.[0]}
                      alt={productSelected?.productName}
                      width={100}
                      height={120}
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 10,
                        border: '1px solid #000',
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <h1 className="text-base text-green-800 font-medium capitalize">
                      {truncateText(productSelected?.productName, 20)}
                    </h1>

                    <Form.Item
                      label="Kích thước"
                      name="size"
                      rules={[{ required: true, message: 'Vui lòng chọn size' }]}
                    >
                      <Checkbox.Group>
                        {uniqueSizes.map((size) => (
                          <Checkbox
                            key={size}
                            value={size}
                            checked={selectedSize === size}
                            onChange={() => handleSizeChange(size as string)}
                            disabled={!validSizes.includes(size)}
                          >
                            {size}
                          </Checkbox>
                        ))}
                      </Checkbox.Group>
                    </Form.Item>

                    <Form.Item label="Màu" name="colors" rules={[{ required: true, message: 'Vui lòng chọn màu' }]}>
                      <Checkbox.Group>
                        {uniqueColors.map((color) => (
                          <Checkbox
                            key={color}
                            value={color}
                            checked={selectedColor === color}
                            onChange={() => handleColorChange(color)}
                            disabled={!validColors.includes(color)}
                          >
                            {color}
                          </Checkbox>
                        ))}
                      </Checkbox.Group>
                    </Form.Item>
                    <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-start gap-2`}>
                      <p className="text-sm">Số lượng: </p>
                      <div className="flex flex-row items-center">
                        <Button
                          icon={<MinusOutlined style={{ fontSize: '16px', color: '#000' }} />}
                          onClick={() => setCount(count - 1)}
                          disabled={count === 1}
                        />
                        <p className="text-lg bg-white px-6 py-2 rounded-xl text-center">{count}</p>
                        <Button
                          icon={<PlusOutlined style={{ fontSize: '16px', color: '#000' }} />}
                          onClick={() => setCount(count + 1)}
                          disabled={count >= maxQuantity}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button size="large" onClick={prevStep}>
                  Quay lại
                </Button>
                <Button size="large" type="primary" htmlType="button" onClick={finishStep2}>
                  Tiếp tục
                </Button>
              </div>
            </Stepper.Step>

            {/* Step 3: Add Note */}
            <Stepper.Step label="Ghi chú" description="Thêm ghi chú cho trao đổi">
              <Form.Item label="Ghi chú" name="note">
                <Input.TextArea placeholder="Ghi chú" />
              </Form.Item>
              <div className="flex justify-between">
                <Button size="large" onClick={prevStep}>
                  Quay lại
                </Button>
                <Button size="large" type="primary" htmlType="submit" onClick={() => onSubmit()}>
                  Tạo trao đổi
                </Button>
              </div>
            </Stepper.Step>
          </Stepper>
        </Form>
      </Modal>
    </>
  )
}
