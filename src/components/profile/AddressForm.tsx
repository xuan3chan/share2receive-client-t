import { Form, Input, Select } from 'antd'

// components/profile/AddressForm.tsx
const AddressForm = ({
  provinces,
  province,
  districts,
  handleProvinceChange,
  handleDistrictChange,
  handleWardChange,
}: any) => {
  return (
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
              ...provinces.map((province: any) => ({
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
  )
}

export default AddressForm
