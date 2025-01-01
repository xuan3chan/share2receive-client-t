import { Drawer, Form, Input, Button, Divider } from 'antd'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import Image from 'next/image'

const Login = ({ open, close }: { open: boolean; close: () => void }) => {
  interface formData {
    account: string
    password: string
  }

  const [form] = Form.useForm()
  const { login, loading } = useAuth()

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
      <Drawer title="Các sản phẩm cần trao đổi" placement="right" onClose={close} open={open}>
        <div className="container mx-auto flex flex-col gap-5">
          <div className="w-full">
            <div className="text-center text-base font-medium">
              <p>Danh sách các sản phẩm trao đổi yêu cầu bạn phải đăng nhập để sử dụng</p>
            </div>
          </div>
          <div className="w-full">
            <div className="text-center text-3xl font-medium text-green-900">
              <h1>Đăng nhập</h1>
            </div>
            <Form form={form} onFinish={onFinish} layout="vertical" size="large" validateTrigger={'onBlur'}>
              <Form.Item
                name="account"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập email!',
                  },
                  {
                    type: 'email',
                    message: 'Email không hợp lệ!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <div className="text-right">
                <span>Quên mật khẩu? </span>
                <Link href="/forget-password">Khôi phục ngay</Link>
              </div>
              <Form.Item>
                <div className="flex justify-center ">
                  <Button
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    size="large"
                    style={{
                      width: '100%',
                    }}
                  >
                    Đăng nhập
                  </Button>
                </div>
              </Form.Item>
              <div className="text-right">
                <span>Chưa có tài khoản? </span>
                <Link href="/register">Đăng ký Ngay</Link>
              </div>
            </Form>
            <Divider
              style={{
                borderColor: '#000',
              }}
              plain
            >
              <div className="text-base">Hoặc</div>
            </Divider>
            <div className="login-with-gg">
              <Link
                href="https://share2receive-server.onrender.com/api/auth/google"
                className="bg-white mx-auto px-6 py-4 rounded-md border block text-black"
              >
                <div className="flex items-center justify-center">
                  <Image src="/images/gmail-icon.png" alt="google-icon" width={30} height={30} />
                  <span className="ml-2 text-black">Đăng nhập với Google</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default Login
