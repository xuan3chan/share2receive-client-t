export type Province = {
  name: string
  code: number
  division_type:
    | 'tỉnh'
    | 'thành phố trung ương'
    | 'huyện'
    | 'quận'
    | 'thành phố'
    | 'thị xã'
    | 'xã'
    | 'thị trấn'
    | 'phường'
  codename: string
  phone_code: number
}

export type ListProvinceSearch = {
  name: string
  code: number
}
