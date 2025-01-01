'use client'

import { Button, Group, Modal, Textarea, TextInput } from '@mantine/core'
import { Combobox, Input, InputBase, useCombobox } from '@mantine/core'
import { useState, useEffect, useMemo } from 'react'
import orderService, { Banking, CancelSubOrder } from '@/services/order/order.service'
import Image from 'next/image'
import { debounce } from 'lodash'
import toast from 'react-hot-toast'
import { useForm } from '@mantine/form'
import { mutate } from 'swr'

export default function ModalCancelSubOrder({
  subOrderId,
  openModalCancelSubOrder,
  setOpenModalCancelSubOrder,
  title,
  orderId,
}: {
  subOrderId: string
  openModalCancelSubOrder: boolean
  setOpenModalCancelSubOrder: (value: boolean) => void
  title: string
  orderId: string
}) {
  const [banking, setBanking] = useState<Banking[]>([])

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  })

  // Thêm state để lưu thông tin ngân hàng đã chọn

  const [selectedBank, setSelectedBank] = useState<Banking | null>(null)
  const [bankingCode, setBankingCode] = useState<string>('')
  const [isBankingAccountValid, setIsBankingAccountValid] = useState<boolean>(false)
 const [bankingAccountInfo, setBankingAccountInfo] = useState<{ ownerName: string } | null>(null) 
  const [search, setSearch] = useState('')
  const [isChecking, setIsChecking] = useState<boolean>(false)
  const [shortName, setShortName] = useState<string>('')

  const [error, setError] = useState<string>('')

  const form = useForm({
    initialValues: {
      bankingCode: '',
      bankingAccount: '',
      bankingBranch: '',
      reason: '',
    },
    validate: {
      bankingAccount: (value) => {
        if (!value) return 'Vui lòng nhập số tài khoản'
        if (value.length < 6) return 'Số tài khoản phải có ít nhất 6 ký tự'
        return null
      },
      bankingBranch: (value) => (!value ? 'Vui lòng nhập chi nhánh ngân hàng' : null),
      reason: (value) => (!value ? 'Vui lòng nhập lý do hủy đơn' : null),
    },
  })

  // Thêm hàm lọc ngân hàng theo từ khóa tìm kiếm
  const filteredBanks = banking.filter(
    (bank) =>
      bank.name.toLowerCase().includes(search.toLowerCase()) ||
      bank.short_name.toLowerCase().includes(search.toLowerCase()),
  )

  useEffect(() => {
    orderService.listBanking().then((res) => {
      setBanking(res.data)
    })
  }, [])

  const handleClose = () => {
    setSelectedBank(null)
    setOpenModalCancelSubOrder(false)
    setBankingCode('')
    setBankingAccountInfo(null)
    setIsBankingAccountValid(false)
    setSearch('')
    setError('')
    form.reset()
  }

  const handleCheckBankingAccount = useMemo(
    () =>
      debounce(() => {
        if (!bankingCode || !form.values.bankingAccount) return

        setIsChecking(true)
        setError('')
        orderService
          .checkBanking(bankingCode, form.values.bankingAccount)
          .then((res) => {
            setIsBankingAccountValid(true)
            setBankingAccountInfo(res.data)
            if (res.msg === 'NOT_FOUND') {
              toast.error('Số tài khoản không hợp lệ')
              setIsBankingAccountValid(false)
              setBankingAccountInfo(null)
              setError('Số tài khoản không hợp lệ')
            }
          })
          .finally(() => {
            setIsChecking(false)
          })
      }, 300),
    [bankingCode, form.values.bankingAccount],
  )

  const onSubmit = form.onSubmit((values) => {
    if (!bankingAccountInfo) {
      toast.error('Vui lòng kiểm tra số tài khoản trước khi tiếp tục')
      return
    }

    const data: CancelSubOrder = {
      bankingName: shortName,
      bankingNumber: values.bankingAccount,
      bankingNameUser: bankingAccountInfo?.ownerName,
      bankingBranch: values.bankingBranch,
      reason: values.reason,
    }

    orderService.cancelSubOrder(
      subOrderId,
      data,
      () => {
        toast.success('Yêu cầu hoàn tiền đã được gửi, đơn hàng này sẽ được hủy')
        handleClose()
        mutate(['/order/id', orderId])
      },
      () => {
        toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!')
      },
    )
  })

  return (
    <Modal size="lg" centered title={title} opened={openModalCancelSubOrder} onClose={() => handleClose()}>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <Combobox
            store={combobox}
            withinPortal={true}
            position="bottom"
            zIndex={201}
            floatingStrategy="absolute"
            onOptionSubmit={(val) => {
              // Lưu toàn bộ thông tin ngân hàng được chọn
              const selected = banking.find((bank) => bank.id === val)
              const bankingCode = selected?.code
              setSelectedBank(selected || null)
              setBankingCode(bankingCode || '')
              setShortName(selected?.short_name || '')
              combobox.closeDropdown()
            }}
          >
            <Combobox.Target>
              <InputBase
                component="button"
                type="button"
                pointer
                rightSection={<Combobox.Chevron />}
                onClick={() => combobox.toggleDropdown()}
                rightSectionPointerEvents="none"
              >
                {selectedBank ? (
                  <div className="flex items-center gap-2">
                    <Image src={selectedBank.icon_url} alt={selectedBank.name} width={20} height={20} />
                    {selectedBank.name}
                  </div>
                ) : (
                  <Input.Placeholder>Chọn ngân hàng</Input.Placeholder>
                )}
              </InputBase>
            </Combobox.Target>
            <Combobox.Dropdown
              style={{
                maxHeight: '200px', // Giới hạn chiều cao dropdown
                overflowY: 'auto', // Kích hoạt cuộn dọc khi nội dung dài
              }}
            >
              <Combobox.Search
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
                placeholder="Tìm kiếm ngân hàng..."
              />
              <Combobox.Options>
                {filteredBanks.map((bank) => (
                  <Combobox.Option value={bank.id} key={bank.id}>
                    <p className="flex flex-1 justify-start items-center gap-2">
                      <Image src={bank.icon_url} alt={bank.name} width={20} height={20} />
                      {bank.name}
                    </p>
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>
          <TextInput label="Số tài khoản" {...form.getInputProps('bankingAccount')} required />
          {!bankingAccountInfo && (
            <Button
              type="button"
              variant="light"
              onClick={handleCheckBankingAccount}
              disabled={!bankingCode || form.values.bankingAccount.length < 6 || isChecking}
              loading={isChecking}
            >
              {isChecking ? 'Đang kiểm tra...' : 'Kiểm tra số tài khoản'}
            </Button>
          )}
          {error && <p className="text-red-500">{error}</p>}

          {isBankingAccountValid && (
            <TextInput label="Tên chủ tài khoản" value={bankingAccountInfo?.ownerName} disabled />
          )}

          <TextInput label="Tên chi nhánh" {...form.getInputProps('bankingBranch')} required />

          <Textarea label="Lý do hủy đơn hàng" {...form.getInputProps('reason')} required />
        </div>

        <Group justify="end" mt="md">
          <Button variant="outline" onClick={() => handleClose()}>
            Hủy
          </Button>
          <Button type="submit" color="green" disabled={!form.isValid() || !bankingAccountInfo}>
            Đồng ý
          </Button>
        </Group>
      </form>
    </Modal>
  )
}
