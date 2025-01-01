'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Form, Button, Input } from 'antd'
import { useAuth } from '@/hooks/useAuth'

interface formData {
  account: string
  password: string
}

const LoginPage = () => {
  const [form] = Form.useForm()
  const { login } = useAuth()

  const onFinish = (values: formData) => {
    login(values, () => {
      form.setFields([
        {
          name: 'account',
          errors: ['Email hoặc mật khẩu không chính xác!'],
        },
        {
          name: 'password',
          errors: ['Email hoặc mật khẩu không chính xác!'],
        },
      ])
    })
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
              <h1 className="text-2xl md:text-5xl pt-5 font-semibold text-center">Đăng nhập</h1>
            </div>
            <div className="login-form-content mt-5">
              <div className="w-[80%] md:w-[60%] mx-auto form-login">
                <Form form={form} onFinish={onFinish} layout="vertical">
                  <Form.Item
                    name="account"
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
                  <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[
                      {
                        required: true,
                        message: 'Mật khẩu không được để trống',
                      },
                    ]}
                  >
                    <Input.Password size="large" placeholder="Nhập vào mật khẩu" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full" size="large">
                      Đăng nhập
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <div className="container mx-auto px-2 md:px-28 text-end">
                <Link href="/forgot-password">
                  <p className="text-green-800">Quên mật khẩu?</p>
                </Link>

                <div className="flex justify-end">
                  <p>Chưa có tài khoản</p>
                  <Link href="/register">
                    <p className="text-green-800 ml-1">Đăng ký ngay</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="divider flex justify-center my-4">
              <div className="flex items-center w-[80%] md:w-[70%]">
                <div className="border-t border border-gray-400 flex-grow"></div>
                <div className="px-3 font-bold">Hoặc</div>
                <div className="border-t border border-gray-400 flex-grow"></div>
              </div>
            </div>
            <div className="login-with-gg">
              <Link
                href="https://share2receive-server.onrender.com/api/auth/google"
                className="bg-white w-full md:w-1/2 mx-auto px-6 py-4 rounded-md border block"
              >
                <div className="flex items-center justify-center">
                  <Image src="/images/gmail-icon.png" alt="google-icon" width={30} height={30} />
                  <span className="ml-2">Đăng nhập với Google</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
