import { useEffect, useState } from 'react'
import { Form, FormInstance } from 'antd'
import { UpdateProfile } from '@/types/users/userTypes'
import { useAuth } from '@/hooks/useAuth'
import moment from 'moment'
import userService from '@/services/users/user.service'
import toast from 'react-hot-toast'

import provinceService from '@/services/province/province.service'

// Định nghĩa interface cho return type của hook
interface UseProfileReturn {
  form: FormInstance
  file: File | null
  preview: string | null
  provinces: any[]
  province: any | null
  districts: any | null
  ward: any | null
  loading: boolean
  handleProvinceChange: (value: string) => void
  handleDistrictChange: (value: string) => void
  handleWardChange: (value: string) => void
  handlePreview: (file: File) => Promise<void>
  onUpload: (file: File) => void
  onFinish: (values: UpdateProfile) => void
}

// Định nghĩa hook
export const useProfile = (): UseProfileReturn => {
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

      const addressParts = user.address.split(', ')
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

  const handleGetAddress = () => {
    if (form.getFieldValue('street')) {
      return `${province?.name}, ${districts?.name}, ${ward?.name}, ${form.getFieldValue('street')}`
    }
    return `${province?.name}, ${districts?.name}, ${ward?.name}`
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

  // Return các giá trị và functions cần thiết
  return {
    form,
    file,
    preview,
    provinces,
    province,
    districts,
    ward,
    loading,
    handleProvinceChange,
    handleDistrictChange,
    handleWardChange,
    handlePreview,
    onUpload,
    onFinish,
  }
}
