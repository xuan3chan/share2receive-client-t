'use client'

import { Button, Modal, Group } from '@mantine/core'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function NavigateToMomo({ payUrl, setPayUrl }: { payUrl: string; setPayUrl: (url: string) => void }) {
  const router = useRouter()
  return (
    <Modal
      opened={!!payUrl}
      onClose={() => {
        setPayUrl('')
      }}
      centered
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="w-14 h-14">
          <Image src="/misc/momo-icon.svg" alt="momo" width={100} height={100} />
        </div>
        <p className="text-lg font-bold">Thanh toán bằng MoMo</p>
        <p className="text-sm text-gray-900">
          Bạn sẽ được chuyển hướng đến trang thanh toán của MoMo. Vui lòng đảm bảo rằng bạn đang sử dụng thiết bị có kết
          nối internet.
        </p>
        <Group justify="end">
          <Button
            type="button"
            style={{
              backgroundColor: '#16a34a',
              color: '#fff',
            }}
            onClick={() => router.push(payUrl)}
          >
            Chuyển tới trang thanh toán
          </Button>
        </Group>
      </div>
    </Modal>
  )
}
