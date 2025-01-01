'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Form, Button, Input, Flex } from 'antd'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface formData {
  firstname: string
  lastname: string
  email: string
  password: string
}

const RegisterPage = () => {
  const [form] = Form.useForm()
  const { register } = useAuth()
  const router = useRouter()

  const onFinish = (values: formData) => {
    register(values)
      .then(() => {
        router.push('/')
        toast.success('Đăng ký thành công')
      })
      .catch(() => {
        form.setFields([
          {
            name: 'email',
            errors: ['Email đã tồn tại'],
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
          <div className="w-full max-w-[590px] p-5  bg-white shadow-xl rounded-md">
            <div className="login-form-title text-white">
              <h1 className="text-2xl md:text-5xl pt-2 font-semibold text-green-800 text-center ">
                Tham gia cùng Share2Receive
              </h1>
            </div>
            <div className="login-form-content mt-5">
              <div className="w-[80%] md:w-[70%] mx-auto form-register">
                <Form form={form} onFinish={onFinish} layout="vertical">
                  <Flex gap={10}>
                    <Form.Item
                      name="firstname"
                      label="Họ"
                      rules={[
                        {
                          required: true,
                          message: 'Họ không được để trống',
                        },
                      ]}
                    >
                      <Input size="large" placeholder="Nhập vào họ" />
                    </Form.Item>
                    <Form.Item
                      name="lastname"
                      label="Tên"
                      rules={[
                        {
                          required: true,
                          message: 'Tên không được để trống',
                        },
                      ]}
                    >
                      <Input size="large" placeholder="Nhập vào tên" />
                    </Form.Item>
                  </Flex>
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
                      Đăng ký
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <div className="divider flex justify-center my-4">
                <div className="flex items-center w-[70%]">
                  <div className="border-t border border-gray-400 flex-grow"></div>
                  <div className="px-3 font-bold ">Hoặc</div>
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
      </div>
    </>
  )
}

export default RegisterPage
