'use client'

import { useEffect, useState } from 'react'
import { Input, Form, Button, Select, Upload, Avatar } from 'antd'
import { UpdateProfile } from '@/types/users/userTypes'
import { useAuth } from '@/hooks/useAuth'
import moment from 'moment'
import userService from '@/services/users/user.service'
import toast from 'react-hot-toast'
import MyDatePicker from '@/components/DatePicker'
import { IconUpload } from '@tabler/icons-react'
import { Group } from '@mantine/core'
import provinceService from '@/services/province/province.service'

const Profile = () => {
  const { user, setLoading, loading, getProfile } = useAuth()
  const [form] = Form.useForm()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [provinces, setProvinces] = useState<any[]>([])
  const [province, setProvince] = useState<any | null>(null)
  const [districts, setDistricts] = useState<any | null>(null)
  const [ward, setWard] = useState<any | null>(null)

  useEffect(() => {
    provinceService.getAllProvinces().then((res) => {
      setProvinces(res)
    })
  }, [user, form])

  useEffect(() => {
    const loadAddressData = async () => {
      if (!user?.address || !provinces.length) return

      const addressParts = user.address.split(', ').reverse()
      const [provinceName, districtName, wardName, street] = addressParts

      try {
        // Tìm và load thông tin tỉnh/thành phố
        const foundProvince = provinces.find((p: any) => p.name === provinceName)
        if (foundProvince) {
          const provinceData = await provinceService.getProvinceById(foundProvince.code)
          setProvince(provinceData)

          // Tìm và load thông tin quận/huyện
          const foundDistrict = provinceData.districts.find((d: any) => d.name === districtName)
          if (foundDistrict) {
            const districtData = await provinceService.getDistrictsByDistrictId(foundDistrict.code)
            setDistricts(districtData)

            // Tìm thông tin phường/xã
            const foundWard = districtData.wards.find((w: any) => w.name === wardName)
            setWard(foundWard)

            // Cập nhật form với đầy đủ thông tin
            form.setFieldsValue({
              province: foundProvince.code,
              district: foundDistrict.code,
              ward: foundWard?.code,
              street,
            })
          }
        }
      } catch (error) {
        console.error('Lỗi khi load dữ liệu địa chỉ:', error)
      }
    }

    loadAddressData()
  }, [user?.address, provinces, form])

  const handleProvinceChange = (value: string) => {
    setDistricts(null)
    setProvince(null)
    form.setFieldsValue({
      district: null,
      ward: null,
    })
    provinceService.getProvinceById(value).then((res) => {
      setProvince(res)
    })
  }

  const handleDistrictChange = (value: string) => {
    setDistricts(null)
    form.setFieldsValue({
      ward: null,
    })
    provinceService.getDistrictsByDistrictId(value).then((res) => {
      setDistricts(res)
    })
  }

  const handleWardChange = (value: string) => {
    const selectedWard = districts?.wards.find((w: any) => w.code === value)
    setWard(selectedWard)
  }

  if (!user) {
    return <div>Loading...</div>
  }

  const handleGetAddress = () => {
    if (form.getFieldValue('street')) {
      return `${form.getFieldValue('street')}, ${ward?.name}, ${districts?.name}, ${province?.name}`
    }
    return `${ward?.name}, ${districts?.name}, ${province?.name}`
  }

  const onFinish = (values: UpdateProfile) => {
    setLoading(true)
    try {
      userService
        .updateProfile({ ...values, address: handleGetAddress() })
        .then((res) => {
          getProfile()
          setLoading(false)
          toast.success('Cập nhật thông tin thành công!')
          if (res) {
            form.setFieldsValue({
              firstname: res.firstname,
              lastname: res.lastname,
              phone: res.phone,
              address: handleGetAddress(),
              email: res.email,
              description: res.description,
              dateOfBirth: moment(res.dateOfBirth),
            })
          }
        })
        .catch((error) => {
          console.log(error)
          toast.error('Đã có lỗi xảy ra vui lòng thử lại!')
          setLoading(false)
        })
        .finally(() => {
          setLoading(false)
        })
    } catch {
      setLoading(false)
    }
  }

  const handlePreview = async (file: File) => {
    const reader = new FileReader()
    setFile(file)
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
  }

  const onUpload = (file: File) => {
    if (!file) {
      return
    }
    const formData = new FormData()
    formData.append('avatar', file)
    userService
      .updateAvatar(formData)
      .then(() => {
        getProfile()
        toast.success('Cập nhật ảnh đại diện thành công!')
        setFile(null)
      })
      .catch(() => {
        toast.error('Đã có lỗi xảy ra vui lòng thử lại!')
        setFile(null)
      })
  }

  return (
    <>
      <div className="container px-1 md:px-10 mx-auto">
        <div className="title text-black text-2xl font-semibold">
          <h2>Thông tin tài khoản</h2>
        </div>
        <div className="mt-5 md:mt-10">
          <div className="profile-avatar bg-white flex items-center gap-3 justify-start pb-6">
            <div className="avatar w-25 h-25 overflow-hidden">
              <Avatar src={preview || user?.avatar} alt="avatar" size={80} />
            </div>
          </div>
          <div className="flex flex-col w-1/3">
            <Upload
              beforeUpload={(file) => {
                handlePreview(file) // Preview the selected image
                return false // Prevent default upload behavior
              }}
              showUploadList={false}
            >
              <Button icon={<IconUpload />}>Tải hình ảnh lên</Button>
            </Upload>
            <Button
              type="primary"
              onClick={() => onUpload(file as File)}
              loading={loading}
              className="mt-3"
              disabled={!file}
              style={{
                width: 'fit-content',
              }}
            >
              Cập nhật ảnh đại diện
            </Button>
          </div>
        </div>
        <div className="profile-desc container mx-auto px-1 mt-5">
          <div className="card bg-white shadow-2xl rounded-md w-full h-auto">
            <div className="form p-3 md:p-8">
              <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                size="large"
                initialValues={{
                  firstname: user?.firstname || '',
                  lastname: user?.lastname || '',
                  phone: user?.phone || '',
                  email: user?.email || '',
                  gender: user?.gender || 'none',
                  description: user?.description || '',
                  dateOfBirth: user?.dateOfBirth ? moment(user.dateOfBirth) : undefined,
                }}
              >
                <div className="w-full flex flex-col md:flex-row md:gap-3">
                  <Form.Item
                    className="w-full"
                    label="Họ"
                    name="firstname"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập họ!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    className="w-full"
                    label="Tên"
                    name="lastname"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập tên!',
                      },
                    ]}
                  >
                    <Input placeholder="Nhập vào tên" />
                  </Form.Item>
                </div>
                <Form.Item
                  className="w-full"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập email!',
                    },
                  ]}
                >
                  <Input disabled />
                </Form.Item>
                <div className="w-full flex gap-3">
                  <Form.Item className="w-full" label="Số điện thoại" name="phone">
                    <Input placeholder="Số điện thoại" />
                  </Form.Item>
                  <Form.Item label="Ngày sinh" name="dateOfBirth" className="w-full">
                    <MyDatePicker className="w-full" placeholder="Chọn ngày sinh" />
                  </Form.Item>
                </div>
                <Form.Item label="Giới tính" name="gender" className="w-1/2">
                  <Select
                    defaultValue="none"
                    className="w-full"
                    options={[
                      {
                        value: 'none',
                        label: 'Chọn giới tính',
                        disabled: true,
                      },
                      { value: 'male', label: 'Nam' },
                      { value: 'female', label: 'Nữ' },
                      { value: 'other', label: 'Khác' },
                    ]}
                  />
                </Form.Item>
                <Form.Item name="address">
                  <div className="w-full flex gap-3">
                    <Form.Item
                      label="Tỉnh/Thành phố"
                      name="province"
                      rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố' }]}
                      style={{ marginBottom: 0, width: '100%' }}
                    >
                      <Select
                        placeholder="Chọn tỉnh thành"
                        showSearch
                        optionFilterProp="label"
                        options={[
                          { value: '', label: 'Chọn tỉnh thành', disabled: true },
                          ...provinces.map((province) => ({
                            value: province.code,
                            label: province.name,
                          })),
                        ]}
                        onChange={handleProvinceChange}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Quận huyện"
                      name="district"
                      rules={[{ required: true, message: 'Vui lòng chọn quận huyện' }]}
                      style={{ marginBottom: 0, width: '100%' }}
                    >
                      <Select
                        placeholder="Chọn quận huyện"
                        showSearch
                        optionFilterProp="label"
                        value={province ? undefined : null}
                        options={province?.districts.map((district: any) => ({
                          value: district.code,
                          label: district.name,
                        }))}
                        onChange={handleDistrictChange}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Phường xã"
                      name="ward"
                      rules={[{ required: true, message: 'Vui lòng chọn phường xã' }]}
                      style={{ marginBottom: 0, width: '100%' }}
                    >
                      <Select
                        placeholder="Chọn phường xã"
                        showSearch
                        optionFilterProp="label"
                        value={districts ? undefined : null}
                        options={districts?.wards.map((ward: any) => ({
                          value: ward.code,
                          label: ward.name,
                        }))}
                        onChange={handleWardChange}
                      />
                    </Form.Item>
                  </div>
                  <Form.Item
                    label="Đường/Số nhà"
                    name="street"
                    className="w-full"
                    style={{
                      marginTop: 15,
                      marginBottom: 0,
                    }}
                  >
                    <Input.TextArea rows={4} placeholder="Đường/Số nhà" />
                  </Form.Item>
                </Form.Item>
                <Form.Item label="Mô tả" name="description">
                  <Input.TextArea rows={4} placeholder="Mô tả" />
                </Form.Item>
                <Form.Item>
                  <Group justify="end">
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Cập nhật
                    </Button>
                  </Group>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
