import { Button, Modal } from 'antd'

export const Alert = ({
  title,
  content,
  nameOk,
  nameCancel,
  onSubmit,
  onOpen,
  onClose,
}: {
  title: string
  content: string
  nameOk: string
  nameCancel: string
  onSubmit: () => void
  onOpen: boolean
  onClose: () => void
}) => {
  return (
    <Modal
      centered
      width={400}
      title={title}
      open={onOpen}
      onClose={onClose}
      onOk={onSubmit}
      onCancel={onClose}
      footer={() => (
        <>
          <Button onClick={onClose}>{nameCancel}</Button>
          <Button
            onClick={onSubmit}
            type="primary"
            style={{
              backgroundColor: '#FF4D4F',
              borderColor: '#FF4D4F',
            }}
          >
            {nameOk}
          </Button>
        </>
      )}
    >
      <p>{content}</p>
    </Modal>
  )
}
