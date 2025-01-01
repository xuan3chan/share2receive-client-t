/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useClient } from '@/hooks/useClient'
import { Form, GetProp, UploadFile, UploadProps, Modal, Tabs } from 'antd'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useProductManagement } from '@/zustand/productManagement'
import toast from 'react-hot-toast'
import productService from '@/services/product/product.service'
import { mutate } from 'swr'
import { Product } from '@/types/users/productTypes'
import { UploadFileStatus } from 'antd/es/upload/interface'
import dynamic from 'next/dynamic'
import { useMediaQuery } from '@mantine/hooks'

const TabInformation = dynamic(() => import('./tabs/tabInformation'), { ssr: false })
const TabUploadImages = dynamic(() => import('./tabs/tabImages'), { ssr: false })

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export default function EditProduct() {
  const { openEditProductModal, toggleEditProductModal, product, setProduct } = useProductManagement()
  const param = useSearchParams()
  const isDesktop = useMediaQuery('(min-width: 62em)')
  const page = Number(param.get('page')) || 1
  const limit = Number(param.get('limit')) || 10
  const searchKey = param.get('searchKey') || ''
  const sortField = param.get('sortField') || ''
  const sortOrder = param.get('sortOrder') || ''

  const { categories, loading, brands } = useClient()

  const [form] = Form.useForm()

  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [typeCheck, setTypeCheck] = useState('sale')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [productId, setProductId] = useState('')

  useEffect(() => {
    if (product) {
      setProductId(product._id)
      setTypeCheck(product.type)
      form.setFieldsValue({
        productName: product.productName,
        status: product.status,
        material: product.material,
        style: product.style,
        condition: product.condition,
        categoryId: product.categoryId,
        brandId: product.brandId,
        description: product.description,
        type: product.type,
        price: product.price,
        weight: product.weight,
        tags: product.tags?.join(' '),
        age: product.age,
        sizeVariants: product.sizeVariants?.map((sizeVariant) => ({
          size: sizeVariant.size,
          colors: sizeVariant.colors,
          amount: sizeVariant.amount,
        })),
      })

      // Cập nhật fileList từ product.imgUrls
      const formattedFileList = product.imgUrls?.map((url, index) => ({
        uid: index.toString(),
        name: `image-${index}.jpg`,
        status: 'done' as UploadFileStatus,
        url: url, // URL của ảnh
      }))

      setFileList(formattedFileList)

      form.setFieldsValue({ images: formattedFileList })
    }
  }, [product, form]) // The form is reset whenever the product or form changes

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const onFinishCreate = () => {
    form
      .validateFields([
        'productName',
        'material',
        'condition',
        'categoryId',
        'brandId',
        'description',
        'type',
        'status',
        'price',
        'style',
        'sizeVariants',
        'weight',
        'age',
      ])
      .then(async () => {
        const formValues = form.getFieldsValue([
          'productName',
          'material',
          'condition',
          'categoryId',
          'brandId',
          'description',
          'type',
          'status',
          'price',
          'style',
          'weight',
          'age',
        ])

        // Tạo object chứa các giá trị đã thay đổi
        const changedValues: Partial<Product> = {}

        // So sánh từng trường và chỉ thêm vào nếu có thay đổi
        Object.keys(formValues).forEach((key) => {
          if (formValues[key] !== product[key as keyof Product]) {
            changedValues[key as keyof Product] = formValues[key]
          }
        })

        // Kiểm tra tags nếu có thay đổi
        const newTags = form.getFieldValue('tags').split(' ')
        if (JSON.stringify(newTags) !== JSON.stringify(product.tags)) {
          changedValues.tags = newTags
        }

        // Kiểm tra sizeVariants nếu có thay đổi
        const newSizeVariants = form
          .getFieldValue('sizeVariants')
          .map((sizeVariant: { size: string; colors: string; amount: number }) => ({
            size: sizeVariant.size,
            colors: sizeVariant.colors,
            amount: sizeVariant.amount,
          }))
        if (JSON.stringify(newSizeVariants) !== JSON.stringify(product.sizeVariants)) {
          changedValues.sizeVariants = newSizeVariants
        }

        // Xử lý giá nếu type là 'sale'
        if (formValues.type === 'sale' && changedValues.price !== undefined) {
          changedValues.price = Number(changedValues.price)
        }
        if (changedValues.weight !== undefined) {
          changedValues.weight = Number(changedValues.weight)
        }

        // Chỉ gọi API nếu có thay đổi
        if (Object.keys(changedValues).length > 0) {
          await productService
            .editProduct(productId, changedValues as Product)
            .then(() => {
              toast.success('Cập nhật sản phẩm thành công!')
              toggleEditProductModal()
              mutate(['/api/product', page, limit, searchKey, sortField, sortOrder])
            })
            .catch((err) => {
              console.error(err)
              toast.error('Đã có lỗi xảy ra vui lòng thử lại!')
            })
        } else {
          toast.error('Không có thay đổi nào được thực hiện')
          toggleEditProductModal()
        }
      })
  }

  const onUploadImages = async () => {
    const formData = new FormData()
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append('images', file.originFileObj as File)
      }
    })

    form.validateFields(['images']).then(async () => {
      try {
        await productService
          .uploadImage(productId, formData)
          .then(() => {
            toast.success('Tải ảnh lên thành công!')
            toggleEditProductModal()
            form.resetFields()
            setProduct({} as Product)
            mutate(['/api/product', page, limit, searchKey, sortField, sortOrder])
          })
          .catch((err) => {
            console.error(err)
            toast.error('Tải ảnh lên thất bại!')
          })
      } catch (err) {
        console.error(err)
        toast.error('Tải ảnh lên thất bại!')
      }
    })
  }

  return (
    <>
      <Modal
        width={isDesktop ? '80%' : '100%'}
        title="Cập nhật sản phẩm"
        centered
        open={openEditProductModal}
        onCancel={() => {
          toggleEditProductModal()
          form.resetFields()
          setProduct({} as Product)
        }}
        destroyOnClose
        footer={null}
      >
        <Tabs
          items={[
            {
              key: '1',
              label: isDesktop ? 'Thông tin sản phẩm' : 'Thông tin',
              children: (
                <TabInformation
                  form={form}
                  product={product}
                  setProduct={setProduct}
                  setTypeCheck={setTypeCheck}
                  typeCheck={typeCheck}
                  toggleEditProductModal={toggleEditProductModal}
                  onFinishCreate={onFinishCreate}
                  loading={loading}
                  categories={categories}
                  brands={brands}
                />
              ),
            },
            {
              key: '2',
              label: isDesktop ? 'Hình ảnh sản phẩm' : 'Hình ảnh',
              children: (
                <TabUploadImages
                  form={form}
                  onUploadImages={onUploadImages}
                  fileList={fileList}
                  productId={productId}
                  product={product}
                  setFileList={setFileList}
                  setPreviewOpen={setPreviewOpen}
                  setPreviewImage={setPreviewImage}
                  previewOpen={previewOpen}
                  previewImage={previewImage}
                  handlePreview={handlePreview}
                />
              ),
            },
          ]}
        />
      </Modal>
    </>
  )
}
