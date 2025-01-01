'use client'
import { Modal, TextInput, Button, Group } from '@mantine/core'
import { Combobox, Input, InputBase, useCombobox } from '@mantine/core'
import { useUserAction } from '@/zustand/user'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { Banking } from '@/services/order/order.service'
import Image from 'next/image'
import bankService from '@/services/bank/bank.service'
import toast from 'react-hot-toast'
import { debounce } from 'lodash'
import userService from '@/services/users/user.service'
import { useAuth } from '@/hooks/useAuth'

export default function ModalUpdateBanking({ banking }: { banking: Banking[] }) {
  const { getProfile } = useAuth()
  const [selectedBank, setSelectedBank] = useState<Banking | null>(null)
  const [bankingCode, setBankingCode] = useState<string>('')
  const [search, setSearch] = useState('')
  const [bankingAccountInfo, setBankingAccountInfo] = useState<{ ownerName: string } | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [error, setError] = useState<string>('')
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  })

  const { openUpdateBanking, setOpenUpdateBanking } = useUserAction()
  const form = useForm({
    initialValues: {
      bankingNumber: '',
      bankingName: '',
      bankingNameUser: '',
      bankingBranch: '',
    },
    validate: {
      bankingNumber: (value) => (value.length < 6 ? 'Số tài khoản không hợp lệ' : null),
      bankingBranch: (value) => (value.length < 1 ? 'Chi nhánh không hợp lệ' : null),
    },
  })

  // Thêm hàm lọc ngân hàng theo từ khóa tìm kiếm
  const filteredBanks = banking.filter(
    (bank) =>
      bank.name.toLowerCase().includes(search.toLowerCase()) ||
      bank.short_name.toLowerCase().includes(search.toLowerCase()),
  )

  const handleCheckBankingAccount = debounce(() => {
    if (!bankingCode || !form.values.bankingNumber) return

    setIsChecking(true)
    bankService
      .checkBanking(bankingCode, form.values.bankingNumber)
      .then((res) => {
        setBankingAccountInfo(res.data)
        form.setFieldValue('bankingNameUser', res.data.ownerName)
        setError('')
        if (res.msg === 'NOT_FOUND') {
          toast.error('Số tài khoản không hợp lệ')
          setBankingAccountInfo(null)
          setError('Số tài khoản không hợp lệ')
        }
      })
      .finally(() => {
        setIsChecking(false)
      })
  }, 300)

  const handleSubmit = async () => {
    if (!form.isValid()) return

    const data = {
      bankingNumber: form.values.bankingNumber,
      bankingNameUser: form.values.bankingNameUser,
      bankingBranch: form.values.bankingBranch,
      bankingName: selectedBank?.short_name,
    }

    await userService.updateProfile(data).then(
      () => {
        toast.success('Cập nhật thông tin ngân hàng thành công')
        onClose()
        getProfile()
      },
      () => {
        toast.error('Cập nhật thông tin ngân hàng thất bại')
        onClose()
      },
    )
  }

  const onClose = () => {
    setOpenUpdateBanking(false)
    form.reset()
    setBankingAccountInfo(null)
    setSearch('')
    setSelectedBank(null)
    setBankingCode('')
    setError('')
  }

  return (
    <>
      <Modal title="Cập nhật thông tin ngân hàng" opened={openUpdateBanking} onClose={onClose} centered size="lg">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <span className="text-sm ">Chọn ngân hàng và nhập số tài khoản để kiểm tra thông tin người dùng</span>
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
              combobox.closeDropdown()
            }}
          >
            <Combobox.Target>
              <InputBase
                component="button"
                type="button"
                pointer
                disabled={!!bankingAccountInfo}
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
          <TextInput
            label="Số tài khoản"
            {...form.getInputProps('bankingNumber')}
            required
            disabled={!!bankingAccountInfo}
          />
          {!bankingAccountInfo && (
            <Button
              type="button"
              variant="light"
              onClick={handleCheckBankingAccount}
              loading={isChecking}
              fullWidth
              disabled={!bankingCode || form.values.bankingNumber.length < 6 || isChecking}
              style={{
                marginTop: '10px',
              }}
            >
              {isChecking ? 'Đang kiểm tra...' : 'Kiểm tra số tài khoản'}
            </Button>
          )}
          {error && <p className="text-red-500">{error}</p>}
          {bankingAccountInfo && (
            <>
              <TextInput disabled label="Tên người dùng" {...form.getInputProps('bankingNameUser')} required />
            </>
          )}
          <TextInput label="Chi nhánh" {...form.getInputProps('bankingBranch')} required />
          <Group justify="end" mt="md">
            <Button variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" color="green" disabled={!form.isValid() || !bankingAccountInfo}>
              Đồng ý
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  )
}
