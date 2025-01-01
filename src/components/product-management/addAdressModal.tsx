'use client'

import { useEffect, useState } from 'react'
import { Modal } from '@mantine/core'
import { useProductManagement } from '@/zustand/productManagement'
import { Button, Form, Input, Select } from 'antd'
import provinceService from '@/services/province/province.service'
import userService from '@/services/users/user.service'
import toast from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'

export default function AddAdressModal() {
  const { openAddressModal, setOpenAddressModal } = useProductManagement()
  const [form] = Form.useForm()
  const [provinces, setProvinces] = useState<any[]>([])
  const [districts, setDistricts] = useState<any>([])
  const [ward, setWard] = useState<any>([])
  const [selectedProvince, setSelectedProvince] = useState<any>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null)
  const [selectedWard, setSelectedWard] = useState<any>(null)
  const { getProfile, user } = useAuth()

  const addressParts = user?.address.split(', ').reverse()

  console.log(addressParts)

  useEffect(() => {
    provinceService.getAllProvinces().then((res) => setProvinces(res))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openAddressModal]) // Fetch once on mount

  useEffect(() => {
    if (user?.address && provinces.length) {
      const addressParts = user.address.split(', ').reverse()
      const [provinceName, districtName, wardName, street] = addressParts

      if (user?.phone) {
        form.setFieldValue('phone', user.phone)
      }

      const province = provinces.find((p: any) => provinceName === p.name)
      if (province) {
        form.setFieldValue('province', province.code)
        setSelectedProvince(province)

        provinceService.getProvinceById(province.code).then((districtRes) => {
          setDistricts(districtRes.districts)
          const district = districtRes.districts.find((d: any) => districtName === d.name)
          if (district) {
            form.setFieldValue('district', district.code)
            setSelectedDistrict(district)

            provinceService.getDistrictsByDistrictId(district.code).then((wardRes) => {
              setWard(wardRes.wards)
              const wardData = wardRes.wards.find((w: any) => wardName === w.name)
              if (wardData) {
                form.setFieldValue('ward', wardData.code)
                setSelectedWard(wardData)
              }
            })
          }
        })
      }

      if (street && !['undefined', 'null'].includes(street)) {
        form.setFieldValue('street', street)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, provinces]) // Ensure provinces are fetched before

  const handleChangeProvince = (value: string) => {
    form.setFieldValue('district', undefined)
    form.setFieldValue('ward', undefined)
    setDistricts([])
    setWard([])
    const province = provinces.find((p: any) => p.code === value)
    if (province) {
      setSelectedProvince(province)
      provinceService.getProvinceById(value).then((res) => {
        setDistricts(res.districts)
      })
    }
  }

  const handleChangeDistrict = (value: string) => {
    form.setFieldValue('ward', undefined)
    setWard([])
    const district = districts.find((d: any) => d.code === value)
    if (district) {
      setSelectedDistrict(district)
      provinceService.getDistrictsByDistrictId(value).then((res) => {
        setWard(res.wards)
      })
    }
  }

  const handleChangeWard = (value: string) => {
    setSelectedWard(ward.find((w: any) => w.code === value))
  }

  const onFinish = () => {
    form.validateFields().then((values) => {
      const address = values.street
        ? `${values.street}, ${selectedWard?.name}, ${selectedDistrict?.name}, ${selectedProvince?.name}`
        : `${selectedWard?.name}, ${selectedDistrict?.name}, ${selectedProvince?.name}`
      userService
        .updateProfile({ ...values, address })
        .then(() => {
          getProfile()
          toast.success('Cập nhật địa chỉ thành công!')
          handleCloseModal()
        })
        .catch(() => {
          toast.error('Đã có lỗi xảy ra vui lòng thử lại sau!')
        })
    })
  }

  const handleCloseModal = () => {
    form.resetFields()
    if (user?.phone) {
      form.setFieldValue('phone', user.phone)
    }
    setSelectedProvince(null)
    setSelectedDistrict(null)
    setSelectedWard(null)
    setDistricts([])
    setWard([])
    setOpenAddressModal(false)
  }

  return (
    <Modal centered size="md" opened={openAddressModal} onClose={handleCloseModal} title="Cập nhật địa chỉ">
      <Form form={form} layout="vertical" size="large" onFinish={onFinish} initialValues={{ phone: user?.phone }}>
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại!' },
            {
              pattern: /^[0-9]{10}$/,
              message: 'Số điện thoại không hợp lệ!',
            },
          ]}
        >
          <Input placeholder="Số điện thoại" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
          name="province"
          label="Tỉnh/Thành phố"
        >
          <Select
            options={provinces.map((province) => ({ label: province.name, value: province.code }))}
            onChange={handleChangeProvince}
            showSearch
            filterOption={(input, option) => option?.label.toLowerCase().includes(input.toLowerCase())}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}
          name="district"
          label="Quận/Huyện"
        >
          <Select
            options={districts.map((district: any) => ({ label: district.name, value: district.code }))}
            onChange={handleChangeDistrict}
            showSearch
            filterOption={(input, option) =>
              option?.label?.toString().toLowerCase().includes(input.toLowerCase()) ?? false
            }
          />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Vui lòng chọn phường/xã!' }]} name="ward" label="Phường/Xã">
          <Select
            options={ward.map((ward: any) => ({ label: ward.name, value: ward.code }))}
            showSearch
            onChange={handleChangeWard}
            filterOption={(input, option) =>
              option?.label?.toString().toLowerCase().includes(input.toLowerCase()) ?? false
            }
          />
        </Form.Item>
        <Form.Item name="street" label="Địa chỉ">
          <Input.TextArea rows={4} placeholder="Địa chỉ" />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={handleCloseModal}>Hủy</Button>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}
