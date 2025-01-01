import { useState } from 'react'
import { Form, GetProp } from 'antd'
import { UploadFile, UploadProps } from 'antd'
import { useSearchParams } from 'next/navigation'
import { useMediaQuery } from '@mantine/hooks'
import { useClient } from '@/hooks/useClient'
import { useProductManagement } from '@/zustand/productManagement'
import productService from '@/services/product/product.service'
import toast from 'react-hot-toast'
import { mutate } from 'swr'
import { addProduct } from '@/types/users/productTypes'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

//eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAddProduct = () => {
  const isDesktop = useMediaQuery('(min-width: 62em)')
  const param = useSearchParams()

  const page = Number(param.get('page')) || 1
  const limit = Number(param.get('limit')) || 10
  const searchKey = param.get('searchKey') || ''
  const sortField = param.get('sortField') || ''
  const sortOrder = param.get('sortOrder') || ''

  const { categories, loading, brands } = useClient()
  const { openAddProductModal, toggleAddProductModal } = useProductManagement()
  const [form] = Form.useForm()
  const [activeStep, setActiveStep] = useState(0)
  const [typeCheck, setTypeCheck] = useState('sale')
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleOpenAddProductModal = () => {
    toggleAddProductModal()
  }

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    form.setFieldsValue({ images: fileList })
  }

  const prevStep = () => {
    setActiveStep((prev) => prev - 1)
  }

  const onFinishCreate = () => {
    form.validateFields().then(() => {
      setActiveStep(1)
    })
  }

  const onUploadImages = async () => {
    const values: addProduct = {
      ...form.getFieldsValue([
        'productName',
        'material',
        'style',
        'condition',
        'categoryId',
        'brandId',
        'description',
        'type',
        'age',
      ]),
      status: 'active',
      tags: form.getFieldValue('tags').split(' '),
      price: Number(form.getFieldValue('price')?.replace(/\D/g, '')) || 0,
      weight: Number(form.getFieldValue('weight')) || 0,
      sizeVariants: form
        .getFieldValue('sizeVariants')
        .map((sizeVariant: { size: string; colors: string; amount: number }) => ({
          size: sizeVariant.size,
          colors: sizeVariant.colors,
          amount: sizeVariant.amount,
        })),
    }
    delete values.images

    const formData = new FormData()
    fileList.forEach((file) => {
      formData.append('images', file.originFileObj as File)
    })

    if (!values) return toast.error('Vui lòng điền đầy đủ thông tin!')

    try {
      const res: any = await productService.addProduct(values)
      if (res) {
        toast.success('Thêm sản phẩm thành công!')
        setActiveStep(1)
        try {
          await productService.uploadImage(res.data._id, formData)
          setFileList([])
          setActiveStep(0)
          form.resetFields()
          toggleAddProductModal()
          toast.success('Đăng tải hình ảnh thành công!')
          mutate(['/api/product', page, limit, searchKey, sortField, sortOrder])
        } catch (error: any) {
          console.error('Upload Image Error:', error.message || error)
          toast.error('Đăng tải hình ảnh thất bại!')
        }
      } else {
        toast.error('Đã có lỗi xảy ra khi thêm sản phẩm, vui lòng thử lại!')
        setActiveStep(0)
      }
    } catch (error: any) {
      console.error('Add Product Error:', error.message || error)
      const errorMessage = error.response?.data?.message || error.message || 'Đã có lỗi xảy ra!'
      toast.error(`Thêm sản phẩm thất bại: ${errorMessage}`)
      setActiveStep(0)
    }
  }

  return {
    isDesktop,
    openAddProductModal,
    handleOpenAddProductModal,
    toggleAddProductModal,
    form,
    activeStep,
    setActiveStep,
    typeCheck,
    setTypeCheck,
    previewOpen,
    setPreviewOpen,
    previewImage,
    setPreviewImage,
    fileList,
    setFileList,
    handlePreview,
    handleChange,
    prevStep,
    onFinishCreate,
    onUploadImages,
    categories,
    loading,
    brands,
  }
}
