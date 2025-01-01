'use client'
import { Modal } from '@mantine/core'
import { useLoginModal } from '@/zustand/loginModal'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Button, Form, Input } from 'antd'

interface formData {
  account: string
  password: string
}

const LoginModal = () => {
  const { isOpen, closeModal } = useLoginModal()
  const { login, loading } = useAuth()

  const [form] = Form.useForm()

  const onFinish = (values: formData) => {
    login(
      values,
      () => {
        form.resetFields()
      },
      () => {
        form.setFields([
          {
            name: 'account',
            errors: ['Email hoặc mật khẩu không chính xác'],
          },
          {
            name: 'password',
            errors: ['Email hoặc mật khẩu không chính xác'],
          },
        ])
      },
    )
  }

  return (
    <Modal.Root opened={isOpen} onClose={closeModal} centered size="lg">
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header className="py-0">
          <Modal.Title></Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Header className="w-full block">
          <Modal.Title>
            <div className="text-xl md:text-3xl w-full font-semibold text-green-900 flex flex-col justify-center items-center">
              <div className="w-16 md:w-24">
                <Image src={'/images/lock.svg'} alt="Lock" width={80} height={80} loading="lazy" />
              </div>
              <h1 className="uppercase text-center">Tham gia cùng Share2Recive</h1>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col justify-center items-center">
            <p>Đăng nhập với email</p>
            <div className="login-with-email container md:px-32">
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
                  <Input name="account" size="large" placeholder="Nhập vào email" />
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
                  <Button block size="large" type="primary" color="default" htmlType="submit" loading={loading}>
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div className="mb-3">
              <p>
                Bạn chưa có tài khoản?{' '}
                <Link href="/register" className="text-green-800 font-bold" onClick={closeModal}>
                  Đăng ký ngay
                </Link>
              </p>
            </div>
            <div className="mb-3">
              <p>
                <Link href="/forgot-password" className="text-green-800 font-bold" onClick={closeModal}>
                  Quên mật khẩu?
                </Link>
              </p>
            </div>
            <div className="flex items-center w-10/12">
              <div className="border-t border border-gray-400 flex-grow"></div>
              <div className="px-3 text-gray-800 font-bold">Hoặc</div>
              <div className="border-t border border-gray-400 flex-grow"></div>
            </div>
            <div className="login-with-google my-2">
              <Link href="https://share2receive-server.onrender.com/api/auth/google">
                <button className="w-fit bg-white border px-6 py-4 rounded-md flex items-center justify-center">
                  <Image src={'/images/gmail-icon.png'} alt="Google" width={30} height={30} loading="lazy" />
                  <span className="ml-3">Đăng nhập với Google</span>
                </button>
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}

export default LoginModal
