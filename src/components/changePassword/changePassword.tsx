'use client'

import { Input, Form, Button } from 'antd'
import userService from '@/services/users/user.service'
import toast from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'
import { Suspense } from 'react'

type ChangePassword = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

const ChangePassword = () => {
  const { setLoading, loading } = useAuth()
  const [form] = Form.useForm()

  const onFinish = (values: ChangePassword) => {
    setLoading(true)
    userService
      .changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      })
      .then(() => {
        setLoading(false)
        toast.success('Cập nhật mật khẩu thành công!')
        form.resetFields()
      })
      .catch((error) => {
        console.log(error)
        toast.error('Đã có lỗi xảy ra vui lòng thử lại!')
        setLoading(false)
      })
  }

  return (
    <>
      <div className="container px-1 md:px-10 mx-auto">
        <div className="title text-black text-2xl font-semibold">
          <h2>Thay đổi mật khẩu</h2>
        </div>
        <div className="mt-10">
          <div className="container mx-auto px-1 mt-5">
            <div className="card bg-white shadow-2xl rounded-md w-full h-auto">
              <div className="form p-8">
                <Suspense>
                  <Form form={form} layout="vertical" size="large" onFinish={onFinish}>
                    <Form.Item
                      className="w-full"
                      label="Mật khẩu hiện tại"
                      name="oldPassword"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập mật khẩu hiện tại!',
                        },
                      ]}
                    >
                      <Input.Password placeholder="Mật khẩu cũ" size="large" />
                    </Form.Item>
                    <Form.Item
                      className="w-full"
                      label="Mật khẩu mới"
                      name="newPassword"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập mật khẩu mới!',
                        },
                        {
                          min: 6,
                          message: 'Mật khẩu phải có ít nhất 6 ký tự!',
                        },
                        {
                          max: 80,
                          message: 'Mật khẩu không được quá 80 ký tự!',
                        },
                      ]}
                    >
                      <Input.Password placeholder="Mật khẩu mới" size="large" />
                    </Form.Item>
                    <Form.Item
                      className="w-full"
                      label="Nhập lại mật khẩu mới"
                      name="confirmPassword"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập lại mật khẩu mới!',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                              return Promise.resolve()
                            }
                            return Promise.reject(new Error('Mật khẩu không khớp!'))
                          },
                        }),
                      ]}
                    >
                      <Input.Password placeholder="Nhập lại mật khẩu mới" size="large" />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" className="w-full" loading={loading} disabled={loading}>
                        Cập nhật mật khẩu
                      </Button>
                    </Form.Item>
                  </Form>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChangePassword
