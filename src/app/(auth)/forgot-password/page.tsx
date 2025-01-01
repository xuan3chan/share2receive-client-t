'use client'
import { Form, Button, Input } from 'antd'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import Cookies from 'js-cookie'

interface formData {
  email: string
}

const ForgotPage = () => {
  const [form] = Form.useForm()
  const { forgetPassword, setLoading, loading } = useAuth()
  const router = useRouter()

  const onFinish = (values: formData) => {
    setLoading(true)
    try {
      forgetPassword(values)
        .then(() => {
          Cookies.set('resetPasswordAllowed', uuidv4())
          setLoading(false)
          setTimeout(() => {
            router.push('/reset-password')
          }, 1000)
        })
        .catch(() => {
          setLoading(false)
          form.setFields([
            {
              name: 'email',
              errors: ['Email không tồn tại'],
            },
          ])
        })
    } catch (error) {
      console.log('error', error)
      setLoading(false)
    }
  }

  return (
    <>
      <div
        className="bg-cover bg-no-repeat w-full h-screen"
        style={{
          backgroundImage: 'url(/images/forest-bg.jpg)',
        }}
      >
        <div className="container mx-auto px-2 md:px-40 w-full h-auto flex justify-center relative top-[15%]">
          <div className="w-full max-w-[590px] p-5 bg-white shadow-xl rounded-md">
            <div className="login-form-title">
              <h1 className="text-2xl md:text-5xl pt-2 font-semibold text-center ">Quên mật khẩu</h1>
              <p className="text-center mt-4">Nhập vào email để khôi phục mật khẩu</p>
            </div>
            <div className="login-form-content mt-5">
              <div className="w-[90%] md:w-[70%] mx-auto">
                <Form form={form} onFinish={onFinish} layout="vertical">
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: 'Email không được để trống',
                      },
                      {
                        type: 'email',
                        message: 'Email không hợp lệ',
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Nhập vào email" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full" size="large" loading={loading}>
                      Gửi
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPage
