import axiosClient, { axiosUpload } from '@/lib/axios'
import { UpdateUserStyle } from '@/types/users/userTypes'

const userService = {
  updateProfile: async (data: any) => {
    const res = await axiosClient.put('/api/users/update-profile', data)

    return res.data
  },
  getProfile: async () => {
    const res = await axiosClient.get('/api/users/view-profile')

    return res.data
  },
  updateAvatar: async (data: FormData) => {
    const res = await axiosUpload.patch('/api/users/update-avatar', data)

    return res.data
  },
  changePassword: async (data: { oldPassword: string; newPassword: string }) => {
    const res = await axiosClient.patch('/api/users/change-password', data)

    return res.data
  },
  updateStyle: async (data: UpdateUserStyle) => {
    const res = await axiosClient.put('/api/users/update-style', data)

    return res.data
  },
}

export default userService
