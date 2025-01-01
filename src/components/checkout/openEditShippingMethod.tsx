'use client'

import { Button, Modal, Select, Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useCheckoutStore } from '@/zustand/checkout'
import checkoutService from '@/services/checkout/checkout.service'
import { useOrderStore } from '@/zustand/order'
import { toast } from 'react-hot-toast'
import { mutate } from 'swr'
import { useEffect } from 'react'
import { SubOrder } from '@/types/orderTypes'

export default function OpenEditShippingMethod({ orderId }: { orderId: string }) {
  const { openEdit, toggleEdit } = useCheckoutStore()
  const { subOrder, setSubOrder } = useOrderStore()

  useEffect(() => {
    form.setValues({
      shippingService: subOrder.shippingService || '',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subOrder])

  const form = useForm({
    initialValues: {
      shippingService: '',
    },

    validate: {
      shippingService: (value) => (value === '' ? 'Vui lòng chọn phương thức vận chuyển' : null),
    },
  })

  const handleClose = () => {
    form.reset()
    toggleEdit()
    setSubOrder({} as SubOrder)
  }

  const handleChangeShippingMethod = async () => {
    form.validate()
    if (form.isValid()) {
      await checkoutService.changeShippingMethod(
        subOrder._id,
        { shippingService: form.values.shippingService },
        () => {
          mutate(['/order/id', orderId])
          handleClose()
          toast.success('Thay đổi phương thức vận chuyển thành công')
        },
        () => {
          toast.error('Đã có xảy ra lỗi, vui lòng thử lại sau')
          handleClose()
        },
      )
    }
  }

  return (
    <>
      <Modal opened={openEdit} onClose={toggleEdit} centered size="lg" title="Thay đổi phương thức vận chuyển">
        <form onSubmit={form.onSubmit(handleChangeShippingMethod)}>
          <Select
            label="Phương thức vận chuyển"
            placeholder="Chọn phương thức vận chuyển"
            data={[
              { label: 'Chọn phương thức vận chuyển', value: '', disabled: true },
              { label: 'Giao hàng nhanh', value: 'GHN' },
              { label: 'Giao hàng tiết kiệm', value: 'GHTK' },
              { label: 'Vận chuyển theo thỏa thuận', value: 'agreement' },
            ]}
            {...form.getInputProps('shippingService')}
          />
          <Group justify="flex-end">
            <Button type="button" mt="md" onClick={handleClose} variant="outline" style={{ color: '#000' }}>
              Hủy
            </Button>
            <Button
              type="submit"
              mt="md"
              style={{
                backgroundColor: '#166534',
                color: '#fff',
              }}
            >
              Thay đổi
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  )
}
