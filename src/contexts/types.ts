export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  account: string
  password: string
  rememberMe?: boolean
}

export type RegisterParams = {
  firstname: string
  lastname: string
  email: string
  password: string
}

// export type UserDataType = {
//   id: number
//   role: string
//   email: string
//   fullName: string
//   username: string
//   password: string
//   avatar?: string | null
// }

export type UserDataType = {
  typeUser: string
  banking: {
    bankingNumber: string
    bankingName: string
    bankingNameUser: string
    bankingBranch: string
    _id: string
  }
  _id: string
  firstname: string
  lastname: string
  email: string
  role: string
  avatar: string
  status: string
  isBlock: boolean
  userStyle: {
    color: string[]
    material: string[]
    size: string[]
    hobby: string[]
    age: string
    zodiacSign: string
    style: string[]
    _id?: string[]
  }
  createdAt: Date | string
  updatedAt: Date | string
  address: string
  dateOfBirth: string | Date
  description: string
  gender: string
  phone: string
  averageRating: number
  numberOfRating: number
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType) => void
  login: (params: LoginParams, sucessCalback?: () => void, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams) => Promise<void>
  forgetPassword: (params: { email: string }) => Promise<void>
  resetPassword: (params: { code: string; newPassword: string }) => Promise<void>
  getProfile: () => Promise<void>
}
