import { Avatar, Button, Upload } from 'antd'
import { IconUpload } from '@tabler/icons-react'

const ProfileAvatar = ({ user, preview, handlePreview, onUpload, file, loading }: any) => {
  return (
    <div className="mt-5 md:mt-10">
      <div className="profile-avatar bg-white flex items-center gap-3 justify-start pb-6">
        <Avatar src={preview || user?.avatar} alt="avatar" size={80} />
      </div>
      <div className="flex flex-col w-1/3">
        <Upload
          beforeUpload={(file) => {
            handlePreview(file)
            return false
          }}
          showUploadList={false}
        >
          <Button icon={<IconUpload />}>Tải hình ảnh lên</Button>
        </Upload>
        <Button
          type="primary"
          onClick={() => onUpload(file)}
          loading={loading}
          className="mt-3"
          disabled={!file}
          style={{ width: 'fit-content' }}
        >
          Cập nhật ảnh đại diện
        </Button>
      </div>
    </div>
  )
}

export default ProfileAvatar
