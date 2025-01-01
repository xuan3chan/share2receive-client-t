// constants/profile.ts
export const GENDER_OPTIONS = [
  { value: 'none', label: 'Chọn giới tính', disabled: true },
  { value: 'male', label: 'Nam' },
  { value: 'female', label: 'Nữ' },
  { value: 'other', label: 'Khác' },
]

export const FORM_RULES = {
  required: { required: true, message: 'Trường này là bắt buộc!' },
}
