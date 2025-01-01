'use client'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import bankService from '@/services/bank/bank.service'
import { Banking } from '@/services/order/order.service'
import Image from 'next/image'
import { Button, TextInput } from '@mantine/core'
import { useUserAction } from '@/zustand/user'
import ModalUpdateBanking from './modalUpdateBanking'
import useSWR from 'swr'

export default function BankingInfor() {
  const { setOpenUpdateBanking } = useUserAction()
  const { user } = useAuth()

  useSWR('list-banking', bankService.listBanking, {
    onSuccess: (data) => {
      setBanking(data.data)
    },
  })

  const [banking, setBanking] = useState<Banking[]>([])

  const filterBanking = banking.filter((bank) => bank.short_name === user?.banking?.bankingName)

  const form = useForm({
    validateInputOnChange: true,
  })

  useEffect(() => {
    if (user) {
      form.setValues({
        bankingNumber: user?.banking?.bankingNumber,
        bankingName: user?.banking?.bankingName,
        bankingNameUser: user?.banking?.bankingNameUser,
        bankingBranch: user?.banking?.bankingBranch,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <>
      <ModalUpdateBanking banking={banking} />
      <div className="container px-1 md:px-10 mx-auto">
        <div className="title text-black text-2xl font-semibold">
          <h2>Thông tin thanh toán</h2>
        </div>
        {user?.banking ? (
          <>
            <div className="container mx-auto px-1 mt-5">
              <div className="card bg-white shadow-2xl rounded-md w-full h-auto">
                <div className="form p-3 md:p-8 flex flex-col gap-3">
                  {/* Card Banking UI */}
                  {filterBanking.map((bank) => (
                    <div key={bank.id}>
                      <div className="flex flex-col gap-2">
                        <p className="text-md font-medium text-black flex items-center gap-2">
                          <span className="text-gray-900">Ngân hàng: </span>
                          {bank.name}
                          <Image src={bank.logo_url} alt="banking" width={100} height={100} />
                        </p>
                        <TextInput
                          label="Số tài khoản"
                          placeholder="Nhập số tài khoản"
                          disabled
                          {...form.getInputProps('bankingNumber')}
                        />
                        <TextInput
                          label="Chủ tài khoản"
                          placeholder="Nhập chủ tài khoản"
                          disabled
                          {...form.getInputProps('bankingNameUser')}
                        />
                        <TextInput
                          label="Chi nhánh"
                          placeholder="Nhập chi nhánh"
                          disabled
                          {...form.getInputProps('bankingBranch')}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <Button variant="filled" color="green" onClick={() => setOpenUpdateBanking(true)}>
                      Cập nhật thông tin ngân hàng
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="container mx-auto px-1 mt-5">
              <div className="card bg-white shadow-2xl rounded-md w-full h-auto">
                <div className="form p-3 md:p-8 flex flex-col gap-3">
                  <div className="flex justify-start">
                    <Button variant="filled" color="green" onClick={() => setOpenUpdateBanking(true)}>
                      Cập nhật thông tin ngân hàng
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
