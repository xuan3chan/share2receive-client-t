'use client'
import { Button, Form, Image, Upload } from 'antd'
import { Grid } from '@mantine/core'
import toast from 'react-hot-toast'

export default function StepPicture({
  form,
  fileList,
  handlePreview,
  handleChange,
  previewImage,
  setPreviewImage,
  previewOpen,
  setPreviewOpen,
  onUploadImages,
  prevStep,
  uploadButton,
}: {
  form: any
  fileList: any
  handlePreview: any
  handleChange: any
  previewImage: any
  setPreviewImage: any
  previewOpen: any
  setPreviewOpen: any
  onUploadImages: any
  prevStep: any
  uploadButton: any
}) {
  return (
    <Form form={form} onFinish={onUploadImages} layout="vertical" validateTrigger="onBlur" size="large">
      <Form.Item name="images" label="Hình ảnh" rules={[{ required: true, message: 'Vui lòng chọn hình ảnh!' }]}>
        <>
          <Upload
            listType="picture-card"
            multiple
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={(file) => {
              if (fileList.length >= 10) {
                toast.error('Bạn chỉ có thể tải lên tối đa 10 hình ảnh!')
                return Upload.LIST_IGNORE // Ngăn upload thêm ảnh mà không hiển thị lỗi mặc định
              }
              if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                toast.error('Chỉ được phép upload ảnh định dạng JPG hoặc PNG!')
                return Upload.LIST_IGNORE
              }
              if (file.size > 2 * 1024 * 1024) {
                toast.error('Hình ảnh không được vượt quá 2MB!')
                return Upload.LIST_IGNORE
              }
              return true // Cho phép upload nếu đạt điều kiện
            }}
            accept=".jpg,.jpeg,.png"
            maxCount={10}
          >
            {fileList.length >= 10 ? null : uploadButton}
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
      <Grid justify="end" mt={15}>
        <Button className="mr-1" onClick={prevStep}>
          Quay lại
        </Button>
        <Button type="primary" htmlType="submit">
          Hoàn tất
        </Button>
      </Grid>
    </Form>
  )
}
