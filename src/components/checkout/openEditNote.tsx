'use client'

import { Button, Modal, Textarea, Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useCheckoutStore } from '@/zustand/checkout'
import checkoutService from '@/services/checkout/checkout.service'
import { useOrderStore } from '@/zustand/order'
import { toast } from 'react-hot-toast'
import { mutate } from 'swr'
import { useEffect } from 'react'
import { SubOrder } from '@/types/orderTypes'

export default function OpenEditNote({ orderId }: { orderId: string }) {
  const { openEditNote, toggleEditNote } = useCheckoutStore()
  const { subOrder, setSubOrder } = useOrderStore()

  useEffect(() => {
    form.setValues({
      note: subOrder.note || '',
    })
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subOrder])

  const form = useForm({
    initialValues: {
      note: '',
    },

    validate: {
      note: (value) => (value === '' ? 'Vui lòng nhập ghi chú' : null),
    },
  })

  const handleClose = () => {
    form.reset()
    toggleEditNote()
    setSubOrder({} as SubOrder)
  }

  const handleChangeNote = async () => {
    form.validate()
    if (form.isValid()) {
      await checkoutService.updateNote(
        subOrder._id,
        { note: form.values.note },
        () => {
          mutate(['/order/id', orderId])
          handleClose()
          toast.success('Thay đổi ghi chú thành công')
        },
        () => {
          toast.error('Đã có xảy ra lỗi, vui lòng thử lại sau')
        },
      )
    }
  }

  return (
    <>
      <Modal opened={openEditNote} onClose={toggleEditNote} centered size="lg" title="Ghi chú">
        <form onSubmit={form.onSubmit(handleChangeNote)}>
          <Textarea rows={3} label="Ghi chú" placeholder="Ghi chú" {...form.getInputProps('note')} />
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
              Lưu
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  )
}
