import { Form, GetProp, Modal, Tabs, UploadFile, UploadProps } from 'antd'
import { Product } from '@/types/users/productTypes'
import { useClient } from '@/hooks/useClient'
import { useEffect, useState } from 'react'
import { useProductManagement } from '@/zustand/productManagement'
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

export default function ViewProductModal() {
  const isDesktop = useMediaQuery('(min-width: 62em)')

  const { openViewProductModal, toggleViewProductModal, product, setProduct } = useProductManagement()
  const { categories, loading, brands } = useClient()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [typeCheck, setTypeCheck] = useState('sale')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [productId, setProductId] = useState('')

  const [form] = Form.useForm()

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
  }, [product, form, openViewProductModal]) // The form is reset whenever the product or form changes

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  return (
    <>
      <Modal
        width={isDesktop ? '80%' : '100%'}
        title="Chi tiết sản phẩm"
        centered
        open={openViewProductModal}
        onCancel={() => {
          toggleViewProductModal()
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
              label: 'Thông tin sản phẩm',
              children: (
                <TabInformation
                  form={form}
                  disabled={true}
                  product={product}
                  setProduct={setProduct}
                  setTypeCheck={setTypeCheck}
                  typeCheck={typeCheck}
                  toggleEditProductModal={toggleViewProductModal}
                  loading={loading}
                  categories={categories}
                  brands={brands}
                />
              ),
            },
            {
              key: '2',
              label: 'Hình ảnh sản phẩm',
              children: (
                <TabUploadImages
                  form={form}
                  disabled={true}
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
