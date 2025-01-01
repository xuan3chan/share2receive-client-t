'use client'

import { Modal, Button, Textarea, Select } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useOrderStore } from '@/zustand/order'
import reportService from '@/services/report/report.service'
import toast from 'react-hot-toast'

export default function ReportModal({ reportType, resson }: { reportType: 'order' | 'product'; resson: any }) {
  const { openReportModal, toggleReportModal, subOrderId } = useOrderStore()

  const form = useForm({
    initialValues: {
      reason: '',
      description: '',
    },

    validate: {
      reason: (value) => {
        if (!value) return 'Vui lòng chọn lý do báo cáo'
        return null
      },
      description: (value) => {
        if (!value) return 'Vui lòng nhập lý do báo cáo'
        if (value.length < 10) return 'Nội dung báo cáo phải có ít nhất 10 ký tự'
        if (value.length > 255) return 'Nội dung báo cáo không được vượt quá 255 ký tự'
        return null
      },
    },
  })

  const handleCreateReport = () => {
    reportService.createReport(
      {
        reportType: reportType,
        targetId: subOrderId,
        reason: form.values.reason,
        description: form.values.description,
      },
      () => {
        toggleReportModal()
        form.reset()
        toast.success('Báo cáo đơn hàng thành công')
      },
      () => {
        toggleReportModal()
        form.reset()
        toast.error('Báo cáo đơn hàng thất bại')
      },
    )
  }

  return (
    <Modal size="lg" centered opened={openReportModal} onClose={toggleReportModal} title="Báo cáo đơn hàng này">
      <form onSubmit={form.onSubmit(handleCreateReport)} className="flex flex-col space-y-4">
        <Select
          data={resson}
          label="Lý do báo cáo"
          placeholder="Chọn lý do báo cáo"
          {...form.getInputProps('reason')}
        />
        <Textarea
          {...form.getInputProps('description')}
          rows={5}
          label="Nội dung báo cáo"
          placeholder="Nhập lý do báo cáo"
        />
        <Button type="submit">Gửi báo cáo</Button>
      </form>
    </Modal>
  )
}
