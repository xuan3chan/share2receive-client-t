/* eslint-disable @typescript-eslint/no-explicit-any */
import productService from '@/services/product/product.service'
import { Form, Upload, Button, Image } from 'antd'
import { Grid } from '@mantine/core'
import toast from 'react-hot-toast'
import { PlusOutlined } from '@ant-design/icons'

export default function TabUploadImages({
  form,
  onUploadImages,
  fileList,
  productId,
  product,
  setFileList,
  setPreviewOpen,
  setPreviewImage,
  previewOpen,
  previewImage,
  handlePreview,
  disabled,
}: {
  form: any
  onUploadImages?: any
  fileList: any
  productId: any
  product: any
  setFileList: any
  setPreviewOpen: any
  setPreviewImage: any
  previewOpen: any
  previewImage: any
  handlePreview: any
  disabled?: any
}) {
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  return (
    <>
      <Form
        form={form}
        onFinish={onUploadImages}
        size="large"
        layout="vertical"
        initialValues={{ images: fileList }}
        disabled={disabled || false}
      >
        <Form.Item
          name="images"
          label="Hình ảnh"
          rules={[{ required: true, message: 'Vui lòng chọn hình ảnh!' }]}
        >
          <>
            <Upload
              onRemove={async (file) => {
                try {
                  const imageUrl =
                    product.imgUrls[
                      fileList.findIndex((item: { uid: any }) => item.uid === file.uid)
                    ]
                  await productService.deleteImage(productId, [imageUrl]).then(() => {
                    // Remove the image from the product
                    const newImgUrls = product.imgUrls.filter((item: string) => item !== imageUrl)
                    product.imgUrls = newImgUrls
                  })
                  toast.success('Xóa hình ảnh thành công!')
                } catch (err) {
                  console.error(err)
                  toast.error('Xóa hình ảnh thất bại!')
                }
                // Update the fileList and form after removing the image
                const newFileList = fileList.filter((item: { uid: any }) => item.uid !== file.uid)
                setFileList(newFileList)
                form.setFieldsValue({ images: newFileList })
              }}
              multiple
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={(info) => {
                const newFileList = info.fileList
                setFileList(newFileList)
                form.setFieldsValue({ images: newFileList })
              }}
              beforeUpload={(file) => {
                if (fileList.length >= 10) {
                  toast.error('Bạn chỉ có thể tải lên tối đa 10 hình ảnh!')
                  return Upload.LIST_IGNORE
                }
                if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                  toast.error('Chỉ được phép upload ảnh định dạng JPG hoặc PNG!')
                  return Upload.LIST_IGNORE
                }
                if (file.size > 2 * 1024 * 1024) {
                  toast.error('Hình ảnh không được vượt quá 2MB!')
                  return Upload.LIST_IGNORE
                }
                return true
              }}
              accept=".jpg,.jpeg,.png"
              maxCount={10}
            >
              {fileList?.length >= 10 ? null : uploadButton}
            </Upload>

            {previewImage && (
              <Image
                alt="preview"
                wrapperStyle={{ display: 'none' }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(''),
                }}
                src={previewImage}
              />
            )}
          </>
        </Form.Item>
        {!disabled && (
          <Grid justify="end" mt={15}>
            <Button className="mr-2">Hủy</Button>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Grid>
        )}
      </Form>
    </>
  )
}
