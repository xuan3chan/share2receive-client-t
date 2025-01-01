export type UserStyle = {
  color: string[]
  material: string[]
  size: string[]
  hobby: string[]
  age: string
  zodiacSign: string
  style: string
}

export type UpdateProfile = {
  firstname: string
  lastname: string
  dateOfBirth: string | Date
  address: string
  gender: string
  phone: string
  description: string
  typeUser: string
  role: string
  userStyle: UserStyle
}

export type UpdateUserStyle = {
  color: string[]
  material: string[]
  size: string[]
  hobby: string[]
  age: string
  zodiacSign: string
  style: string[]
}
