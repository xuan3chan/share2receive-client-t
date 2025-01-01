'use client'

import { useOrderStore } from '@/zustand/order'
import { Modal, Button, Group, Select, Stack, TextInput, Textarea } from '@mantine/core'
import orderService from '@/services/order/order.service'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { mutate } from 'swr'
import provinceService from '@/services/province/province.service'
import { useAuth } from '@/hooks/useAuth'

export default function ChangeAddressModal() {
  const { toggleChangeAddressModal, openChangeAddressModal, idOrder, address, phone } = useOrderStore()
  const { user } = useAuth()

  const [provinces, setProvinces] = useState<any>([])
  const [districts, setDistricts] = useState<any | null>(null)
  const [wards, setWards] = useState<any | null>(null)

  useEffect(() => {
    if (user) {
      form.setValues({
        phone: user?.phone || '',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const form = useForm({
    initialValues: {
      phone: user?.phone || '',
      district: '',
      ward: '',
      province: '',
      address: '',
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: {
      phone: (value) => {
        if (!value) return 'Vui lòng nhập số điện thoại'
        const phoneRegex = /^[0-9]{10}$/ // Chỉ chấp nhận 10-11 chữ số
        if (!phoneRegex.test(value)) return 'Số điện thoại không hợp lệ'
        return null
      },
      province: (value) => {
        if (!value) return 'Vui lòng chọn tỉnh thành'
        return null
      },
      district: (value) => {
        if (!value) return 'Vui lòng chọn quận huyện'
        return null
      },
      ward: (value) => {
        if (!value) return 'Vui lòng chọn phường xã'
        return null
      },
      address: (value) => {
        if (value.length > 100) return 'Địa chỉ không quá 100 ký tự'
        return null
      },
    },
  })

  useEffect(() => {
    provinceService.getAllProvinces().then((res) => {
      setProvinces(res)
    })
  }, [])

  const handleChangeProvince = (value: string) => {
    form.setValues({
      district: '',
      ward: '',
      province: value || '',
    })
    setDistricts(null)
    setWards(null)
    if (value) {
      provinceService.getProvinceById(value).then((res: any) => {
        setDistricts(res.districts)
      })
    }
  }

  const handleChangeDistrict = (value: string) => {
    form.setValues({
      ward: '',
      district: value || '',
    })
    setWards(null)
    if (value) {
      provinceService.getDistrictsByDistrictId(value).then((res: any) => {
        setWards(res.wards)
      })
    }
  }

  useEffect(() => {
    if (phone || address) {
      form.setValues({
        phone: phone || '',
        province: '',
        district: '',
        ward: '',
        address: '',
      })
    }
  }, [phone, address])

  const handleClose = () => {
    toggleChangeAddressModal()
    form.reset()
  }

  const handleChangeAddress = async (values: any) => {
    const validation = form.validate()
    if (validation.hasErrors) return

    const selectedProvince = provinces.find((p: any) => p.code.toString() === form.values.province)
    const selectedDistrict = districts?.find((d: any) => d.code.toString() === form.values.district)
    const selectedWard = wards?.find((w: any) => w.code.toString() === form.values.ward)

    const address = values.address
      ? `${values.address}, ${selectedWard?.name}, ${selectedDistrict?.name}, ${selectedProvince?.name}`
      : `${selectedWard?.name}, ${selectedDistrict?.name}, ${selectedProvince?.name}`

    try {
      await orderService.updateAddressOrder(
        idOrder,
        {
          address: address,
          phone: values.phone,
          type: 'momo_wallet',
        },
        () => {
          toast.success('Cập nhật địa chỉ thành công')
          mutate(['/order/id', idOrder])
          toggleChangeAddressModal()
        },
        () => {
          toast.error('Cập nhật địa chỉ thất bại')
        },
      )
    } catch (error) {
      console.error('Lỗi khi cập nhật địa chỉ:', error)
    }
  }

  return (
    <>
      <Modal opened={openChangeAddressModal} onClose={handleClose} title="Đổi địa chỉ nhận hàng" centered>
        <form onSubmit={form.onSubmit(handleChangeAddress)}>
          <TextInput
            placeholder="Số điện thoại"
            {...form.getInputProps('phone')}
            error={form.errors.phone ? form.errors.phone : null} // Hiển thị lỗi nếu có
            style={{
              marginBottom: 10,
            }}
          />
          <Stack>
            <Select
              value={form.values.province}
              data={provinces.map((province: any) => ({ value: province.code.toString(), label: province.name }))}
              placeholder="Chọn tỉnh thành"
              onChange={(value) => handleChangeProvince(value || '')}
              error={form.errors.province ? form.errors.province : null}
              searchable
              searchValue={provinces.find((p: any) => p.code.toString() === form.values.province)?.name}
            />
            <Select
              value={form.values.district}
              searchable
              searchValue={districts?.find((d: any) => d.code.toString() === form.values.district)?.name}
              data={[
                ...(districts?.map((district: any) => ({ value: district.code.toString(), label: district.name })) ||
                  []),
              ]}
              placeholder="Chọn quận huyện"
              onChange={(value) => handleChangeDistrict(value || '')}
              error={form.errors.district ? form.errors.district : null}
            />
            <Select
              value={form.values.ward}
              searchable
              searchValue={wards?.find((w: any) => w.code.toString() === form.values.ward)?.name}
              data={[...(wards?.map((ward: any) => ({ value: ward.code.toString(), label: ward.name })) || [])]}
              placeholder="Chọn phường xã"
              onChange={(value) => form.setFieldValue('ward', value || '')}
              error={form.errors.ward ? form.errors.ward : null}
            />
            <Textarea placeholder="Địa chỉ cụ thể" {...form.getInputProps('address')} />
          </Stack>
          <Group justify="end" mt="md">
            <Button onClick={handleClose} style={{ backgroundColor: 'gray', color: '#fff' }}>
              Hủy
            </Button>
            <Button
              disabled={!form.isValid()}
              type="submit"
              style={{ backgroundColor: !form.isValid() ? 'gray' : '#16a34a', color: '#fff' }}
            >
              Đổi địa chỉ
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  )
}
