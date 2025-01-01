import { Button, Group, Modal } from '@mantine/core'

export default function ModalCancel({
  openModalCancel,
  setOpenModalCancel,
  handleCancelOrder,
  title,
  subtitle,
}: {
  openModalCancel: boolean
  setOpenModalCancel: (value: boolean) => void
  handleCancelOrder: () => void
  title: string
  subtitle: string
}) {
  return (
    <Modal size="lg" centered title={title} opened={openModalCancel} onClose={() => setOpenModalCancel(false)}>
      <div>
        <h1>{subtitle}</h1>
        <Group justify="end" mt="md">
          <Button variant="outline" onClick={() => setOpenModalCancel(false)}>
            Hủy
          </Button>
          <Button color="red" onClick={handleCancelOrder}>
            Đồng ý
          </Button>
        </Group>
      </div>
    </Modal>
  )
}
